const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const isPlaylistLimit = require('../../src/middleware/isPlaylistLimit.middleware');

describe('Check open connections', () => {
  const res = {};

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  it('should fail when user has more than 3 open connections', () => {
    res.locals = { auth: { openConnections: 4 } };

    isPlaylistLimit({}, res, () => {});
    expect(res.status).to.have.been.calledWith(403);
  });

  it('should call next middleware when user has up to 3 connections', () => {
    res.locals = { auth: { openConnections: 2 } };

    const next = sinon.stub();

    isPlaylistLimit({}, res, next);
    expect(next).to.have.been.called;
  });
});
