describe('.off()', function() {

  var listener = function() {
    throw 'Shouldn\'t be called';
  };

  beforeEach(function() {
    base.append('<ul class="temp"><li class="off-single-test">1</li>\
    <li class="off-multiple-test">2</li>\
    <li class="off-multiple-test">3</li>\
    </ul>');
  });

  afterEach(function(){
    base.find(".temp").remove();
    expect(u(".temp").length).to.equal(0);
  });

  it('should be defined', function() {
    expect(typeof base.off).to.equal('function');
  });

  it('on works', function(done) {
    u('.off-single-test').on('click', function(){ done(); });
    u('.off-single-test').trigger('click');
  });

  it('removes event from single element', function() {
    u('.off-single-test').on('click', listener);
    u('.off-single-test').off('click');
    u('.off-single-test').trigger('click');
  });

  it('removes event from multiple elements', function() {
    u('.off-multiple-test').on('click', listener);
    u('.off-multiple-test').off('click');
    u('.off-multiple-test').trigger('click');
  });

  it('removes event multiple times', function() {
    u('.off-multiple-test').on('click', listener);
    u('.off-multiple-test').on('click', function(){
      throw "Error";
    });
    u('.off-multiple-test').off('click');
    u('.off-multiple-test').trigger('click');
  });

  it('removes multiple events', function() {
    u('.off-multiple-test').on('click mouseover', listener);
    u('.off-multiple-test').off('click mouseover');
    u('.off-multiple-test').trigger('mouseover');
  });

  it('does not remove manual event', function(done) {
    u('.off-single-test').first().addEventListener('click', function(){
      done();
    });
    u('.off-single-test').off('click');
    u('.off-single-test').trigger('click');
  });

  it('does remove event listener matching passed-in function', function(done) {
    var listener_to_be_kept = function() { done(); }
    u('.off-single-test').on('click', listener);
    u('.off-single-test').on('click', listener_to_be_kept);
    u('.off-single-test').off('click', listener);
    u('.off-single-test').trigger('click');
  });

  it('does remove event listener matching passed-in selector & function', function(done) {
    var listener_to_be_kept = function() { done(); }
    u('.temp').on('click', '.off-single-test', listener);
    u('.temp').on('click', '.off-single-test', listener_to_be_kept);
    u('.temp').off('click', '.off-single-test', listener);
    u('.temp').find('.off-single-test').trigger('click');
  });

  it('does remove event listener only added via same form (listener only form)', function(done) {
    var listener_to_be_kept = function() { done(); }
    u('.temp').on('click', '.off-single-test', listener_to_be_kept);
    u('.temp').on('click', listener_to_be_kept);
    u('.temp').off('click', listener_to_be_kept);
    u('.temp').find('.off-single-test').trigger('click');
  });

  it('does remove event listener only added via same form (selector & listener form)', function(done) {
    var listener_to_be_kept = function() { done(); }
    u('.temp').on('click', '.off-single-test', listener_to_be_kept);
    u('.temp').on('click', listener_to_be_kept);
    u('.temp').off('click', '.off-single-test', listener_to_be_kept);
    u('.temp').trigger('click');
  });
});
