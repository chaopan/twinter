import {submit, getContent} from '../utilities';

let jsonData = JSON.stringify({
  "userId": "1",
  "title": "foo",
  "body": "body123456789"
});

const createMockXHR = (responseJSON) => {
  const mockXHR = {
    open: jest.genMockFn(),
    send: jest.genMockFn(),
    setRequestHeader: jest.genMockFn(),
    readyState: 4,
    responseText: JSON.stringify({val: 'val'})
  };
  return mockXHR;
}

const oldXMLHttpRequest = window.XMLHttpRequest;
//window.XMLHttpRequest = jest.fn(() => mockXHR);

describe('utilities getContent', () => {
  const oldXMLHttpRequest = window.XMLHttpRequest;
  let mockXHR = null;
  let requestPromise = null;

  beforeEach(()=>{
    mockXHR = createMockXHR();
    window.XMLHttpRequest = jest.fn(() => mockXHR);
    requestPromise = getContent('www.example.com');
    requestPromise.then(()=>{},()=>{});
  })

  afterEach(()=>{
    window.XMLHttpRequest = oldXMLHttpRequest;
  })

  it('should xhr open and send with correct parameters', () => {
    expect(mockXHR.open).toBeCalledWith("GET", 'www.example.com', true);
    //expect(setRequestHeader).toBeCalledWith("Content-Type", "application/json; charset=UTF-8");
    expect(mockXHR.send).toBeCalled();
  });

  it('should reject on a failing response', () => {
    mockXHR.status = 404;

    mockXHR.onreadystatechange();
    expect(requestPromise).rejects.toEqual(404)
  });

  it('should resolve on a ok response', () => {
    mockXHR.status = 200;
    mockXHR.responseText = JSON.stringify({value : "example response"});

    mockXHR.onreadystatechange();
    expect(requestPromise).resolves.toEqual({value: "example response"})
  });

});

describe('utilities submit', () => {
  const oldXMLHttpRequest = window.XMLHttpRequest;
  let mockXHR = null;
  let requestPromise = null;

  beforeEach(()=>{
    mockXHR = createMockXHR();
    window.XMLHttpRequest = jest.fn(() => mockXHR);
    requestPromise = submit('www.example.com', jsonData);
    requestPromise.then(()=>{},()=>{});
  });

  afterEach(()=>{
    window.XMLHttpRequest = oldXMLHttpRequest;
  });

  it('should xhr open, send, and setheaders', () => {
    expect(mockXHR.open).toBeCalledWith("POST", "www.example.com", true);
    expect(mockXHR.setRequestHeader).toBeCalledWith("Content-Type", "application/json; charset=UTF-8");
    expect(mockXHR.send).toBeCalledWith(jsonData);
  });

  it('should reject on a failing response', () => {
    mockXHR.status = 404;
    mockXHR.onreadystatechange();
    expect(requestPromise).rejects.toEqual(404);
  });

  it('should resolve on an ok response', () => {
    const testJson = JSON.stringify({value : "example response"});
    mockXHR.status = 201;
    mockXHR.responseText = testJson
    mockXHR.onreadystatechange();
    expect(requestPromise).resolves.toEqual(testJson)
  });
});