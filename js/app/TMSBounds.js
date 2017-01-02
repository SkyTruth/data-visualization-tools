define([
  "app/Class"
], function(
  Class
) {
  return Class({
    name: "TMSBounds",

    initialize: function () {
      var self = this;

      self.zoom = undefined;
      self.x = undefined;
      self.y = undefined;

      self.update.apply(self, arguments);
    },

    clone: function() {
      var self = this;
      return new self.constructor(self);
    },

    toArray: function() {
      return [this.zoom, this.x, this.y];
    },

    toBBOX: function () {
      var self = this;
      return self.toArray().map(function (item) {
        return item.toString();
      }).join(",");
    },


    extend: function () {
      var self = this;

      if (self.zoom <= 0) return undefined;

      bounds = new self.constructor(self);
      bounds.zoom -= 1;
      bounds.x = Math.floor(bounds.x / 2.);
      bounds.y = Math.floor(bounds.y / 2.);
      return bounds;
    },

    containsObj: function (obj, partial, inclusive) {
      var self = this;

      if (self.zoom > obj.zoom) return false;
      while (self.zoom < obj.zoom) {
        obj = obj.extend();
      }

      return self.x == obj.x && self.y == obj.y;
    },

    intersectsObj: function (obj, partial, inclusive) {
      var self = this;

      if (self.zoom > obj.zoom) {
        return obj.containsObj(self, partial, inclusive);
      } else {
        return self.containsObj(obj, partial, inclusive);
      }
    },

    /**
     * Update the Bounds object in place.
     *
     * update("zoom,x,y")
     * update([zoom,x,y]);
     * update(obj, obj, ...);
     */
    update: function () {
      var self = this;

      var updateOne = function (obj) {
        var zoom = undefined;
        var x = undefined;
        var y = undefined;

        if (obj.length !== undefined) {
          if (typeof(obj) == "string") {
            obj = obj.split(",");
          }
          self.zoom = parseFloat(obj[0]);
          self.x = parseFloat(obj[1]);
          self.y = parseFloat(obj[2]);
        } else {
          if (obj.getBounds !== undefined) {
            obj = obj.getBounds();
          }

          if (obj.zoom !== undefined) {
            zoom = obj.zoom;
          }
          if (obj.x !== undefined) {
            x = obj.x;
          }
          if (obj.y !== undefined) {
            y = obj.y;
          }
        }

        if (zoom) { zoom = parseFloat(zoom); }
        if (x) { x = parseFloat(x); }
        if (y) { y = parseFloat(y); }

        if (zoom !== undefined) {
          self.zoom = zoom;
        }
        if (x !== undefined) {
          self.x = x;
        }
        if (y !== undefined) {
          self.y = y;
        }
      };
 
      for (var i = 0; i < arguments.length; i++) {
        updateOne(arguments[i]);
      }
    },

    getBounds: function () { return this; },

    toString: function () {
      var self = this;
      return self.toBBOX();
    },

    toJSON: function () {
      var self = this;
      return {zoom:self.zoom, x:self.x, y:self.y}
    }
  });
});