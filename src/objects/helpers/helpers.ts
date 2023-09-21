/**
 * Generates vertices for asteroid polygon with certain count and radius
 * @param  {Number} count   Number of vertices
 * @param  {Number} rad     Maximal radius of polygon
 * @return {Array}        Array of vertices: {x: Number, y: Number}
 */
export function asteroidVertices(count:number, rad:number) {
    let p = [];
    for (let i = 0; i < count; i++) {
      p[i] = {
        x: (-Math.sin((360/count)*i*Math.PI/180) + Math.round(Math.random()*2-1)*Math.random()/3)*rad,
        y: (-Math.cos((360/count)*i*Math.PI/180) + Math.round(Math.random()*2-1)*Math.random()/3)*rad
      };
    }
    return p;
  };
  
  /**
   * Rotate point around center on certain angle
   * @param {Object} p        {x: Number, y: Number}
   * @param {Object} center   {x: Number, y: Number}
   * @param {Number} angle    Angle in radians
   */
  export function rotatePoint(p:{x:number,y:number}, center:{x:number,y:number}, angle:number) {
    return {
      x: ((p.x-center.x)*Math.cos(angle) - (p.y-center.y)*Math.sin(angle)) + center.x,
      y: ((p.x-center.x)*Math.sin(angle) + (p.y-center.y)*Math.cos(angle)) + center.y
    };
  };
  
  /**
   * Random Number between 2 numbers
   */
  export function randomNumBetween(max:number, min:number=0) {
    return Math.min(Math.random() * (max - min + ((max-min)/.99-(max-min))) + min,max);
  };
  
  /**
   * Random Number between 2 numbers excluding a certain range
   */
  export function randomNumBetweenExcluding(min:number, max:number, exMin:number, exMax:number) {
    let random = randomNumBetween(max, min);
    while (random > exMin && random < exMax) {
      random = Math.random() * (max - min + 1) + min;
    }
    return random;
  };

  export function getSmallCirclesInLarge(sRad:number,num:number){
    return (sRad*Math.sin(Math.PI/num))/(1+Math.sin(Math.PI/num))
  }

  export function getLargeCircleAroundSmall(sRad:number,num:number){
    return (sRad*(1+Math.sin(Math.PI/num)))/(Math.sin(Math.PI/num))
  }

  export function degreesToRadians(d:number){
    return d*Math.PI/180
  }

  export function radiansToDegrees(r:number){
    return r*180/Math.PI
  }

  // value should be in r1 scale and returns value in r2 scale
  export function convertRange( value:number, r1:[number,number], r2:[number,number] ) { 
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
  }