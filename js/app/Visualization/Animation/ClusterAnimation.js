define(["require", "app/Class", "app/Visualization/Shader", "app/Visualization/Animation/Animation"], function(require, Class, Shader, Animation) {
  var ClusterAnimation = Class(Animation, {
    name: "ClusterAnimation",

    columns: {
      longitude: {type: "Float32", hidden: true, source: {longitude: 1.0}},
      latitude: {type: "Float32", hidden: true, source: {latitude: 1.0}},

      sigma: {type: "Float32", source: {sigma: 1}, min: 0.0, max: 1.0},
      weight: {type: "Float32", source: {weight: 1}, min: 0.0, max: 1.0},

      time: {type: "Float32", hidden: true, source: {datetime: 1.0}}
    },

    programSpecs: {
      program: {
        context: "gl",
        vertex: "app/Visualization/Animation/ClusterAnimation-vertex.glsl",
        fragment: "app/Visualization/Animation/ClusterAnimation-fragment.glsl"
      }
/* ,
      rowidxProgram: {
        context: "rowidxGl",
        vertex: "app/Visualization/Animation/ClusterAnimation-rowidx-vertex.glsl",
        fragment: "app/Visualization/Animation/ClusterAnimation-rowidx-fragment.glsl"
      }
*/
    },

    getDrawMode: function (program) {
      var self = this;
      return program.gl.POINTS;
    }
  });
  Animation.animationClasses.ClusterAnimation = ClusterAnimation;

  return ClusterAnimation;
});