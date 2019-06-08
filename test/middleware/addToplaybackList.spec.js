const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const addToPlaybackList = require('../../src/middleware/addToPlaybackList.middleware');
const User = require('../../src/model/user.model');
const reqHeader = require('../../src/middleware/reqHeader');

describe('Add clip to user\'s playback list', () => {
  const updateUser = sinon.stub(User, 'update');
  const extractAuth = sinon.stub(reqHeader, 'extractAuth');

  beforeEach(() => {
    extractAuth.onFirstCall().returns({ email: 'john@mail.com' });
    updateUser.onFirstCall().returns({ email: 'anna@mail.com', openConnections: 2 });
  });

  afterEach(() => {
    updateUser.restore();
    extractAuth.restore();
  });

  it('should allow user watch clip', async () => {
    const res = { locals: { auth: {} } };
    const next = sinon.stub();

    await addToPlaybackList({}, res, next);
    expect(next).to.have.been.called;
  });
});
