function Cell(width, height, color, mine) {
  this.height = height || 100;
  this.width = width || 100;
  this.color = color || 'gray';
  this.mine = mine || false;
}

Cell.prototype.toHTML = function() {
  const div = document.createElement('div');
  div.style.height = `${this.height}px`;
  div.style.width = `${this.width}px`;
  div.style.color = this.color;
  div.style.margin = '0';
  div.style.display = 'inline-block';
  div.style.border = '1px black solid';
  return div;
};
