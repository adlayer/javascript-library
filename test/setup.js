mocha.setup('bdd');
$(function () {
  mocha
    .run()
    .globals(['foo', 'bar','adlayer']) // acceptable globals
});