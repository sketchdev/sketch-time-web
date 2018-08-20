import deepEqual from 'deep-equal';
import AuthHelper from './AuthHelper';

// noinspection JSUnresolvedVariable
const apiRoot = process.env.REACT_APP_WORKFLOW_API_ROOT || 'http://localhost:3001';

const APP_JSON = 'application/json';

const stubs = {
  // path can be a string or regexp
  // stub can be an object or function
  GET: [],
  GET_FILE: [],
  POST: [],
  PATCH: [],
  PUT: [] ,
};

const patchOrPut = (method) => (path, data, existingDataOrVersion, accessToken) => {
  let version;
  let dataToSend;
  if (typeof existingDataOrVersion === 'object') {
    dataToSend = onlyChangedValues(data, existingDataOrVersion);
    version = existingDataOrVersion.version;
  } else {
    dataToSend = data;
    version = existingDataOrVersion;
  }
  const options = {
    method,
    headers: buildHeaders(accessToken, APP_JSON, { 'IF-Match': version }),
    body: JSON.stringify(dataToSend)
  };
  return handlePromise(fetch(`${apiRoot}${path}`, options));
};

const ApiHelper = {
  get: (path, accessToken) => {
    const stub = getStub('GET', path);
    if (stub) {
      return stubResponse(stub);
    }

    const headers = buildHeaders(accessToken);
    return handlePromise(fetch(`${apiRoot}${path}`, { headers }));
  },

  getFile: (path, accessToken) => {
    const stub = getStub('GET_FILE', path);
    if (stub) {
      return stubResponse(stub);
    }

    const headers = buildHeaders(accessToken);
    return handlePromise(fetch(`${apiRoot}${path}`, { headers }), false);
  },

  post: (path, data, accessToken) => {
    const options = {
      method: 'POST',
      headers: buildHeaders(accessToken),
      body: JSON.stringify(data)
    };
    return handlePromise(fetch(`${apiRoot}${path}`, options));
  },

  putFormData: (path, formData, accessToken) => {
    const options = {
      method: 'PUT',
      headers: buildHeaders(accessToken, null),
      body: formData
    };
    return handlePromise(fetch(`${apiRoot}${path}`, options));
  },

  postFormData: (path, formData, accessToken) => {
    const options = {
      method: 'POST',
      headers: buildHeaders(accessToken, null),
      body: formData
    };
    return handlePromise(fetch(`${apiRoot}${path}`, options));
  },

  patch: patchOrPut('PATCH'),

  put: patchOrPut('PUT'),

  delete: (path, accessToken) => {
    const options = {
      method: 'DELETE',
      headers: buildHeaders(accessToken)
    };
    return handlePromise(fetch(`${apiRoot}${path}`, options));
  }
};

function buildHeaders(accessToken, contentType=APP_JSON, additionalHeaders={}) {
  let headers = {};
  if (contentType) {
    headers['Content-Type'] = contentType;
  }
  accessToken = accessToken || AuthHelper.currentToken();
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  return Object.assign(headers, additionalHeaders);
}

function handlePromise(promise, jsonResponse=true) {
  return promise.then(resp => {
    if (resp.ok) {
      let dataPromise = resp.text();
      if (jsonResponse) {
        dataPromise = dataPromise.then(toJsonIfPresent);
      }
      return dataPromise.then(data => ({ statusCode: resp.status, data, errors: null, clientError: false }));
    } else if (resp.status >= 400 && resp.status < 500) {
      return resp.text()
        .then(toJsonIfPresent)
        .then(errors => {
          if (errors && typeof errors === 'string') {
            errors = { base: {messages: [errors]}};
          }
          errors = errors || { base: {messages: ['Invalid request']}};
          return { statusCode: resp.status, errors, data: null, clientError: true };
        });
    } else {
      resp.text().then(t => console.error('raw error body', t));
      const errors = { base: {messages: ['Request failed']}};
      return { statusCode: resp.status, errors, data: null, clientError: false };
    }
  });
}

function toJsonIfPresent(txt) {
  if (txt) {
    return JSON.parse(txt);
  } else {
    return null;
  }
}

function onlyChangedValues(newData, existingData) {
  const trimmedData = {};
  for (const [key, val] of Object.entries(newData)) {
    if (!deepEqual(existingData[key], val)) {
      trimmedData[key] = val;
    }
  }
  return trimmedData;
}

function stubResponse(data) {
  if (typeof data === 'function') {
    data = data();
  }
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ statusCode: 200, errors: null, data });
    }, 500);
  });
}

function getStub(method, path) {
  const entry =  stubs[method].find(e => e.path instanceof RegExp ? path.match(e.path) : path === e.path);
  return entry ? entry.stub : null;
}

export default ApiHelper;
