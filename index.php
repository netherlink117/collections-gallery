<?php
header('Access-Control-Allow-Origin: *');
$is_collections_container = true;
$is_ffmpeg_installed = true;
$pathSeparator = PHP_OS_FAMILY === 'Windows' ? '\\' : '/';
$rootPath = dirname(__FILE__);
$rootPath = explode($pathSeparator, $rootPath);
array_pop($rootPath);
array_pop($rootPath);
$rootPath = join($pathSeparator, $rootPath);
if ($is_collections_container) {
  $rootPath = "/collections";
}
if (isset($_GET['path'])) {
  try {
    $dir = str_replace('\\', $pathSeparator, $_GET['path']);
    $dir = str_replace('/', $pathSeparator, $dir);
    if (!is_dir($rootPath.($dir === $pathSeparator ? '' : $dir)) || strpos($_GET['path'], $pathSeparator.'..') !== false){
      http_response_code(404);
      throw new Exception('Path not exists');
    }
    $paths = scandir($rootPath.$dir);
    sort($paths);
    $array_path = explode($pathSeparator, $dir);
    $name = end($array_path);
    $directory = [
      'path' => $dir,
      'name' => $name,
      'type' => 'directory',
      'parent' => 'none',
      'content' => [
        'directories' => array(),
        'files' => array(),
      ]
    ];
    foreach ($paths as &$path) {
      if ($path != '.' && $path != '..') {
        if (is_dir($rootPath.($dir === $pathSeparator ? '' : $dir).$pathSeparator.$path)) {
          $subdirectory = [
            'parent' => $directory['path'],
            'path' => ($dir === $pathSeparator ? '' : $dir).$pathSeparator.$path,
            'name' => $path,
            'type' => 'directory'
          ];
          array_push($directory['content']['directories'], $subdirectory);
        } else {
          $filesize = filesize($rootPath.($dir === $pathSeparator ? '' : $dir).$pathSeparator.$path);
          $mimetype = mime_content_type($rootPath.($dir === $pathSeparator ? '' : $dir).$pathSeparator.$path);
          $file = [
            'parent' => $directory['path'],
            'path' => ($dir === $pathSeparator ? '' : $dir).$pathSeparator.$path,
            'name' => $path,
            'type' => 'file',
            'size' => $filesize,
            'mimetype' => $mimetype
          ];
          if($is_ffmpeg_installed && isset($_GET['metadata'])) {
            $cmd = 'ffprobe -v error -show_entries format_tags -of json "'.$rootPath.($dir === $pathSeparator ? '' : $dir).$pathSeparator.$path.'"';
            $descriptorspec = array(
              1 => array('pipe', 'w')
            );
            $options = array(
              'bypass_shell' => true
            );
            if(str_contains($mimetype, 'image')) {
              $file['metadata'] = null;
            } else if(str_contains($mimetype, 'video')) {
              $proc = proc_open($cmd, $descriptorspec, $pipes, $rootPath.$dir, null, $options);
              $pipe = stream_get_contents($pipes[1]);
              fclose($pipes[1]);
              proc_close($proc);
              $meta = array();
              if($pipe !== null && $pipe !== '' && $pipe !== false) {
                // $meta = implode(null, $output);
                $meta = json_decode($pipe, true);
                $meta = isset($meta['format']) ? $meta['format'] : [];
                $meta = isset($meta['tags']) ? $meta['tags'] : [];
                $metadata = array();
                // regularize, so javascript can handle it better
                foreach($meta as $key => $value) {
                  $metadata[strtolower($key)] = $value;
                };
                // clean, this is optional, reduces network traffic
                unset($metadata['compatible_brands'], $metadata['major_brand'], $metadata['minor_version'], $metadata['encoder']);
                $file['metadata'] = $metadata;
              } else {
                $file['metadata'] = null;
              }
            }
          }
          array_push($directory['content']['files'], $file);
        }
      }
    }
    echo json_encode($directory);
  } catch (Exception $e) {
    echo json_encode([
      'message' => $e->getMessage()
    ]);
  }
} else {
  echo file_get_contents("./dist/index.html");
}