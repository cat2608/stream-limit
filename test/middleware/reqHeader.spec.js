const { expect } = require('chai');

const reqHeader = require('../../src/middleware/utils/reqHeader');

describe('Extract authentication from request', () => {
  let req = {};
  beforeEach(() => {
    req = { headers: {}, query: {} };
  });

  it('should get user authentication from header', () => {
    req.headers = { authorization: 'Bearer eyJlbWFpbCI6ImFubmFAbWFpbC5jb20ifQ==' };
    const auth = reqHeader.extractAuth(req);
    expect(auth.email).to.equal('anna@mail.com');
  });

  it('should get user authentication url', () => {
    const token = 'eyJlbWFpbCI6ImFubmFAbWFpbC5jb20ifQ==';
    req.query = { token };
    const auth = reqHeader.extractAuth(req);
    expect(auth.email).to.equal('anna@mail.com');
  });

  it('should return null when token not present', () => {
    const auth = reqHeader.extractAuth(req);
    expect(auth).to.be.null;
  });
});
