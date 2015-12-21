'use strict';

describe('Service: FoldStateManager', function () {

  // load the service's module
  beforeEach(window.angular.mock.module('SwaggerEditor'));

  // instantiate service
  var FoldStateManager;
  beforeEach(inject(function (_FoldStateManager_) {
    if (!FoldStateManager) {
      FoldStateManager = _FoldStateManager_;
    }
  }));

  describe('#getFoldedTree', function () {

    it('keeps the $folded values', function () {

      var result = FoldStateManager.getFoldedTree(
        {
          info: {title: 'A'},
          paths: {
            foo: {
              $folded: true
            }
          }
        },
        {
          info: {title: 'B'},
          paths: {
            foo: {}
          }
        }
      );

      expect(result).to.deep.equal({
        info: {title: 'B'},
        paths: {
          foo: {
            $folded: true
          }
        }
      });
    });

    it('does not add extra nodes just because of $folded values', function () {
      var result = FoldStateManager.getFoldedTree(
        {
          info: {title: 'A'},
          paths: {
            foo: {
              $folded: true
            }
          }
        },
        {
          info: {title: 'B'},
          paths: {
            bar: {}
          }
        }
      );

      var expectation = {
        info: {title: 'B'},
        paths: {} // bar should not be here as well as foo
      };

      // TODO: why chai deep equal is not working?
      // expect(result).to.deep.equal(expectation);
      expect(JSON.stringify(result)).to.equal(JSON.stringify(expectation));

    });
  });
});
