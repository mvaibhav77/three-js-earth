uniform sampler2D dayTexture;
uniform sampler2D nightTexture;
uniform vec3 sunDirection;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vec2 uv = vUv;
    
    // Calculate the dot product between surface normal and sun direction
    float sunDot = dot(vNormal, normalize(sunDirection));
    
    // Create a smooth transition between day and night
    // sunDot ranges from -1 (night) to 1 (day)
    float dayNightMix = smoothstep(-0.1, 0.1, sunDot);
    
    // Sample both textures
    vec4 dayColor = texture2D(dayTexture, uv);
    vec4 nightColor = texture2D(nightTexture, uv);
    
    // Mix between day and night textures
    vec4 color = mix(nightColor, dayColor, dayNightMix);
    
    // Add some ambient lighting to prevent completely black areas
    vec3 ambientLight = vec3(0.1, 0.1, 0.15);
    
    // Apply basic lighting
    float lightIntensity = max(sunDot, 0.0);
    vec3 finalColor = color.rgb * (ambientLight + lightIntensity);
    
    gl_FragColor = vec4(finalColor, color.a);
}
