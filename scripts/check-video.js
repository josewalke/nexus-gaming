// Script para verificar el estado del video
console.log('🔍 Verificando video de experiencia...');

// Función para verificar si el video existe
async function checkVideoExists(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('❌ Error al verificar video:', error);
    return false;
  }
}

// Función para verificar soporte de video
function checkVideoSupport() {
  const video = document.createElement('video');
  const canPlayMP4 = video.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
  const canPlayWebM = video.canPlayType('video/webm; codecs="vp8, vorbis"');
  
  console.log('📱 Soporte de video:');
  console.log('  - MP4:', canPlayMP4);
  console.log('  - WebM:', canPlayWebM);
  
  return canPlayMP4 !== '' || canPlayWebM !== '';
}

// Función para verificar conexión
function checkConnection() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  if (connection) {
    console.log('🌐 Información de conexión:');
    console.log('  - Tipo efectivo:', connection.effectiveType);
    console.log('  - Velocidad:', connection.downlink, 'Mbps');
    console.log('  - RTT:', connection.rtt, 'ms');
    console.log('  - Ahorro de datos:', connection.saveData);
  } else {
    console.log('🌐 No se puede detectar información de conexión');
  }
}

// Función principal
async function main() {
  console.log('🚀 Iniciando verificación...');
  
  // Verificar soporte de video
  const hasVideoSupport = checkVideoSupport();
  
  // Verificar conexión
  checkConnection();
  
  // Verificar archivo de video
  const videoUrl = '/assets/experience-video.mp4';
  const videoExists = await checkVideoExists(videoUrl);
  
  console.log('📹 Estado del archivo de video:');
  console.log('  - URL:', videoUrl);
  console.log('  - Existe:', videoExists ? '✅' : '❌');
  
  // Verificar elementos en el DOM
  const videoElement = document.querySelector('.nexus-video-bg');
  const fallbackElement = document.querySelector('.nexus-video-fallback');
  const loadingElement = document.querySelector('.nexus-video-loading');
  
  console.log('🎬 Elementos en el DOM:');
  console.log('  - Video:', videoElement ? '✅' : '❌');
  console.log('  - Fallback:', fallbackElement ? '✅' : '❌');
  console.log('  - Loading:', loadingElement ? '✅' : '❌');
  
  // Recomendaciones
  console.log('\n💡 Recomendaciones:');
  
  if (!hasVideoSupport) {
    console.log('  - El navegador no soporta video HTML5');
  }
  
  if (!videoExists) {
    console.log('  - El archivo de video no existe en la ruta especificada');
  }
  
  if (!videoElement && !fallbackElement) {
    console.log('  - No se encontraron elementos de video en el DOM');
  }
  
  if (videoElement) {
    const video = videoElement;
    console.log('  - Estado del video:', video.readyState);
    console.log('  - Error del video:', video.error);
    console.log('  - Reproduciendo:', !video.paused);
  }
  
  console.log('\n✅ Verificación completada');
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}

// También ejecutar después de un tiempo para verificar cambios
setTimeout(main, 2000); 