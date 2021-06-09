<?php
header("Access-Control-Allow-Origin: *");
$is_ffmpeg_installed = true;
$rootPath = dirname(__FILE__);
$pathSeparator = PHP_OS_FAMILY === 'Windows' ? '\\' : '/';
if(defined('STDIN')) {
  echo date('Y-m-d H:i:s')." start update of file\n";
	$d = directory($rootPath);
  $d['version'] = time();
  $fcontent = json_encode($d);
  file_put_contents($rootPath.$pathSeparator.'collections.json', $fcontent);
  echo date('Y-m-d H:i:s')." succesfully update file\n";
} else {
  if(isset($_GET['update'])) {
    if(!file_exists($rootPath.$pathSeparator.'logs.txt')) {
      file_put_contents($rootPath.$pathSeparator.'logs.txt', 'this is a log file that can be deleted but will be re-generated');
    }
    $logs = file($rootPath.$pathSeparator.'logs.txt');
    $lastlog = $logs[count($logs) - 1];
    if(str_contains($lastlog, 'start')) {
      echo '{"message":"update already started"}';
    } else {
      if(PHP_OS_FAMILY === 'Windows') {
        pclose(popen('start "Update" /d "'.$rootPath.'" /min cmd.exe /c "php.exe -f ""'.$rootPath.$pathSeparator.'index.php"" >> ""'.$rootPath.$pathSeparator.'logs.txt"""', 'r'));
      } else {
        exec('php -f "'.$rootPath.$pathSeparator.'index.php" >> "'.$rootPath.$pathSeparator.'logs.txt" &');
      }
      echo '{"message":"generating file collections.json and it might take long"}';
    }
  } else if(isset($_GET['report'])) {
    if(!file_exists($rootPath.$pathSeparator.'logs.txt')) {
      file_put_contents($rootPath.$pathSeparator.'logs.txt', 'this is a log file that can be deleted but will be re-generated');
    }
    $logs = file($rootPath.$pathSeparator.'logs.txt');
    $lastlog = $logs[count($logs) - 1];
    if(str_contains($lastlog, 'start')) {
      echo '{"message":"update active"}';
    } else {
      echo '{"message":"update inactive"}';
    }
  } else if(file_exists($rootPath.$pathSeparator.'collections.json')) {
    echo file_get_contents($rootPath.$pathSeparator.'collections.json');
  } else {
    echo '{"message":"file collections.json not found"}';
  }
}

function directory($dir) {
  global $is_ffmpeg_installed, $pathSeparator, $finfo;
  $paths = scandir($dir);
  sort($paths);
  $array_path = explode($pathSeparator, $dir);
  $name = end($array_path);
  $directory = [
    'name' => $name,
    'type' => 'directory',
    'size' => 0,
    'content' => array()
  ];
  foreach ($paths as &$path) {
    if ($path != '.' && $path != '..'){
      if (is_dir($dir.$pathSeparator.$path)) {
        $subdirectory = directory($dir.$pathSeparator.$path);
        $directory['size'] += $subdirectory['size'];
        array_push($directory['content'], $subdirectory);
      } else {
        $filesize = filesize($dir.$pathSeparator.$path);
        $mimetype = mime_content_type($dir.$pathSeparator.$path);
        $file = [
          'type' => 'file',
          'name' => $path,
          'size' => $filesize,
          'mimetype' => $mimetype
        ];
        if($is_ffmpeg_installed) {
          $cmd = 'ffprobe -v error -show_entries format_tags -of json "'.$dir.$pathSeparator.$path.'"';
          $descriptorspec = array(
            1 => array('pipe', 'w')
          );
          $options = array(
            'bypass_shell' => true
          );
          if(str_contains($mimetype, 'image')) {
            $file['metadata'] = null;
          } else if(str_contains($mimetype, 'video')) {
            $proc = proc_open($cmd, $descriptorspec, $pipes, $dir, null, $options);
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
        $directory['size'] += $file['size'];
        array_push($directory['content'], $file);
      }
    }
  }
  return $directory;
}
