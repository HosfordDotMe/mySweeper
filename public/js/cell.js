function Cell(width, height, color, mineLevel) {
  this.height = height || 100;
  this.width = width || 100;
  this.color = color || 'gray';
  this.mineLevel = mineLevel || 0;
  this.neighbors = 0;
}

Cell.prototype.toHTML = function() {
  const div = document.createElement('div');
  div.style.height = `${this.height}px`;
  div.style.width = `${this.width}px`;
  div.style.backgroundColor = this.color;
  div.style.margin = '0';
  div.style.display = 'inline-block';
  div.style.border = '1px black solid';
  return div;
};
