
module.exports = {
  js: {
    src: '<%= src.main %>',
    dest: '<%= distdir %>/mana.js'
  },
  options: {
    browserifyOptions: {
      standalone: 'mana'
    }
  }
};
