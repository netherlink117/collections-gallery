<?php
header('Access-Control-Allow-Origin: *');
$is_collections_container = true;
$is_ffmpeg_installed = true;
$rootPath = dirname(__FILE__);
// $rootPath = 'change this to absolute root path where files are stored';
if ($is_collections_container) {
  $rootPath = "/collections";
}
// ?path=/example&find=something&items=20&last=1
if (isset($_GET['path'])) {
  $path = str_replace('"', '\"', $_GET['path']);
  if (is_file($rootPath.$_GET['path'])) { // return details in json {path, phash, mimetype, metadata}
    //retrieve metadatas
    $file = array();
    // get mimetype
    $cmd = 'file --mime-type -b "'.$rootPath.$path.'"';
    $descriptorspec = array(
      1 => array('pipe', 'w')
    );
    $options = array(
      'bypass_shell' => true
    );
    $proc = proc_open($cmd, $descriptorspec, $pipes, null, null, $options);
    $pipe = stream_get_contents($pipes[1]); // get stout
    fclose($pipes[1]);
    proc_close($proc);
    if ($pipe !== null && $pipe !== '' && $pipe !== false) {
      $file['path'] = $_GET['path'];
      $file['phash'] = md5($_GET['path']);
      $file['mimetype'] = $pipe;
      if (strpos($pipe, 'image') !== false) {
        $file['metadata'] = null; // check later if can get metadata of pictures, by now set only null
      } else if (strpos($pipe, 'video') !== false) {
        $cmd = 'ffprobe -v error -show_entries format_tags -of json "'.$rootPath.$path.'"';
        $proc = proc_open($cmd, $descriptorspec, $pipes, null, null, $options);
        $pipe = stream_get_contents($pipes[1]);
        fclose($pipes[1]);
        proc_close($proc);
        $meta = array();
        if ($pipe !== null && $pipe !== '' && $pipe !== false) {
          // $meta = implode(null, $output);
          $meta = json_decode($pipe, true);
          $meta = isset($meta['format']) ? $meta['format'] : [];
          $meta = isset($meta['tags']) ? $meta['tags'] : [];
          $metadata = array();
          // regularize, so javascript can handle it better
          foreach ($meta as $key => $value) {
            $metadata[strtolower($key)] = $value;
          };
          // clean, this is optional, but reduces network traffic and memory 
          unset($metadata['compatible_brands'], $metadata['major_brand'], $metadata['minor_version'], $metadata['encoder']);
          $file['metadata'] = $metadata;
        } else {
          $file['metadata'] = null;
        }
        echo json_encode($file);
      }
    }
  } else { // return list of items in json [{path, phash, name, type, size}]
    // try to sanitize needle
    $_GET['find'] = str_replace('"', '\"', $_GET['find']);
    // find directory/folder
    $cmd = null;
    if (isset($_GET['find'])) {
      $cmd = 'find "'.$rootPath.$path.'" -iname "*'.$_GET['find'].'*" -printf "%y%s %p\n"';
    } else {
      $cmd = 'find "'.$rootPath.$path.'" -maxdepth 1 -mindepth 1 -printf "%y%s %p\n"';
    }
    $descriptorspec = array(
      1 => array('pipe', 'w')
    );
    $options = array(
      'bypass_shell' => true
    );
    $proc = proc_open($cmd, $descriptorspec, $pipes, null, null, $options);
    $pipe = stream_get_contents($pipes[1]); // get stout
    fclose($pipes[1]);
    proc_close($proc);;
    $pipe = explode("\n", $pipe);
    $items = array();
    $push = !isset($_GET['last']);
    foreach ($pipe as &$item) {
      preg_match('/^(d|f)(\d+) (.+)$/', $item, $match);
      if (count($match) === 4) {
        $item = array();
        $item['path'] = $match[3];
        $item['phash'] = md5($match[3]);
        $item['name'] = basename($match[3]);
        $item['type'] = $match[1] === 'f' ? 'file' : 'directory';
        $item['size'] = $match[2];
        if ($push) {
          if (isset($_GET['items'])) {
            if (count($items) < $_GET['items']) {
              array_push($items, $item);
            }
          } else {
            array_push($items, $item);
          }
        } else {
          $push = $_GET['last'] === $match[3];
        }
      }
    }
    echo json_encode($items);
  }
} else {
  echo file_get_contents("./dist/index.html");
}