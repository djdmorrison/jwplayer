import ViewsManager from 'view/utils/views-manager';
import sinon from 'sinon';

describe('ViewsManager', function() {
    describe('#size', () => {
        it('returns the number of views added', () => {
            const view = {};
            expect(ViewsManager.size()).to.equal(0);
            ViewsManager.add(view);
            ViewsManager.add(view);
            expect(ViewsManager.size()).to.equal(2);
            ViewsManager.remove(view);
            expect(ViewsManager.size()).to.equal(1);
            ViewsManager.remove(view);
            expect(ViewsManager.size()).to.equal(0);
        });
    });
    describe('#addScrollHandler', () => {
        let mock;
        it('initializes the scroll handler and calls the added handler', () => {
            mock = sinon.spy();
            ViewsManager.addScrollHandler(mock);

            var event = document.createEvent('Event');
            event.initEvent('scroll', true, true);
            window.dispatchEvent(event);

            expect(mock.called).to.be.true;
        });
        it('only adds a scrolling function one time', () => {
            mock = sinon.spy();
            ViewsManager.addScrollHandler(mock);
            ViewsManager.addScrollHandler(mock);
            ViewsManager.addScrollHandler(mock);
            ViewsManager.addScrollHandler(mock);
            ViewsManager.addScrollHandler(mock);

            var event = document.createEvent('Event');
            event.initEvent('scroll', true, true);
            window.dispatchEvent(event);

            expect(mock.callCount).to.eql(1);;
        });
        afterEach(() => {
            ViewsManager.removeScrollHandler(mock);
        })
    });
    describe('#removeScrollHandler', () => {
        let mock;
        it('removes the expected handler', () => {
            mock = sinon.spy();
            ViewsManager.addScrollHandler(mock);

            var event = document.createEvent('Event');
            event.initEvent('scroll', true, true);
            window.dispatchEvent(event);

            expect(mock.callCount).to.eql(1);

            ViewsManager.removeScrollHandler(mock);

            window.dispatchEvent(event);

            expect(mock.callCount).to.eql(1);
        });
        after(() => {
            // In case the test case breaks out, clean up
            ViewsManager.removeScrollHandler(mock);
        })
    });
});
