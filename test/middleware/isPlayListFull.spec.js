const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const isPlaylistFull = require('../../src/middleware/isPlaylistFull.middleware');

describe('Check open connections', () => {
  const res = {};

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  it('should fail when user has more than 3 open connections', () => {
    res.locals = { auth: { openConnection: 4 } };

    isPlaylistFull({}, res, () => {});
    expect(res.status).to.have.been.calledWith(403);
  });

  it('should call next middleware when user has up to 3 connections', () => {
    res.locals = { auth: { openConnection: 2 } };

    const next = sinon.stub();

    isPlaylistFull({}, res, next);
    expect(next).to.have.been.called;
  });
});
