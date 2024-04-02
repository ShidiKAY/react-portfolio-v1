import { add, dot, multiply } from "mathjs";

function project(v1, v2) {
  const numerator = mathjs.dot(v1, v2);
  const denominator = mathjs.dot(v2, v2);
  return multiply(numerator, v2); // Use multiply instead of scale
}

function calculateCollisionVelocity(velocity, normal, restitution) {
  // Calculation of the new velocity after collision
  const relativeVelocity = dot(velocity, normal); // Project velocity onto normal
  const newRelativeVelocity = -restitution * relativeVelocity; // Invert and scale by restitution

  // Calculate tangential component
  const tangent = mathjs.cross(normal, mathjs.ones(3)); // Calculate tangent using cross product
  const normalizedTangent = mathjs.unit(tangent); // Normalize the tangent vector
  const tangentialVelocity = project(velocity, normalizedTangent); // Project velocity onto tangent using custom function

  // Combine normal and tangential components for new velocity
  return add(scale(newRelativeVelocity, normal), tangentialVelocity);
}

export default calculateCollisionVelocity;
