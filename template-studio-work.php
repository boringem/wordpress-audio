<?php
/**
 * Template Name: Studio Work
 */

 // sets up the variables 
 $studio_work_album = array();
 // requests all audio posts with the studio tag
 $args = array 
    (
        'post_type' => 'attachment',
        'post_mime_type' => 'audio',
        'numberposts' => -1
    );
$audiofiles = get_posts($args);
require_once( ABSPATH . 'wp-admin/includes/media.php' );
$file_num = 0;
foreach ($audiofiles as $file) {
    $url = wp_get_attachment_url($file->ID);
    $file_meta_info = wp_get_attachment_metadata( $file->ID );
    $sw_desc = get_post($file->ID);
    $sw_desc_cont = $sw_desc->post_content;

    if($file_meta_info['album'] == 'Studio Work') {
        $track_url = $url;
        $track_desc = $sw_desc_cont;
        $track_title = $file->post_title;
        $track_album = $file_meta_info['album'];
        $track_artist = $file_meta_info['artist'];
        $studio_work_album[$file_num]['url'] = $track_url;
        $studio_work_album[$file_num]['title'] = $track_title;
        $studio_work_album[$file_num]['album'] = $track_album;
        $studio_work_album[$file_num]['artist'] = $track_artist;
        $studio_work_album[$file_num]['desc'] = $track_desc;
        $file_num++;
    } else {
    }
}
// creates a list of all the song titles
$num_of_tracks = count($studio_work_album);
?>
<?php get_header(); ?>
<h3 class="text-center mb-2 mt-1">Studio Work</h3>
<div class="container-fluid">
<div class="row">
<div class="col-md-4 mt-1" id="sw-audioplayer-container">
<div id="sw-audioplayer">
    <div class="row">
       <div class="col-md-12">
           <audio id="mainPlayer">
               <source id="playerSource" src="" type="audio/mpeg" />
           </audio>
        </div>
        <div class="col-md-12 text-center ap-dash">
            <span id="trackTitle"></span> - <span id="trackArtist"></span>
        </div>
        <div class="col-md-12">
            <span id="timeline">
                <div id="playhead"></div>
            </span>
            <span id="timer"></span>
        </div>
            <div class="col-md-4 col-4"><button id="lButton" class="sw-prev" onClick="prevTrack()"></button></div>
            <div class="col-md-4 col-4 text-center"><button id="pButton" class="sw-play" onClick="playAudio()"></button></div>
            <div class="col-md-4 col-4"><button id="fButton" class="sw-next" onClick="nextTrack()"></button></div>
    </div>
</div>
<?php 
echo '<ol class="sw-pl">';
$i = 0;
foreach($studio_work_album as $track_item) {
    $url_info = $track_item['url'];
    $title_info = $track_item['title'];
    $artist_info = $track_item['artist'];
    $desc_info = $track_item['desc'];
    if($i == 0) {
        echo "\n<li id='firstTrack' class='activeTrack' data-trackurl='$url_info' data-track-title='$title_info' data-track-artist='$artist_info' data-track-desc='$desc_info'>" . $title_info . "</li>\n";
    } else {
        echo "\n<li data-track-url='$url_info' data-track-title='$title_info' data-track-artist='$artist_info' data-track-desc='$desc_info'>" . $title_info . "</li>\n";
    }
    $i++;
}
echo '</ol></div>';
?>
<div class="col-md-7 mt-1 ml-2">
    <div class="row">
        <div class="col-md-1">
            <h4>Title: </h4>
        </div>
        <div class="col-md-11 text-left">
            <h6 id="moreTitle"></h6>
        </div>
    </div>
    <div class="row">
        <div class="col-md-1">
            <h4>Artist: </h4>
        </div>
        <div class="col-md-11 text-left">
            <h6 id="moreArtist"></h6>
        </div>
    </div>
    <div class="row">
        <div class="col-md-1">
            <h4>Info: </h4>
        </div>
        <div class="col-md-11 text-left">
            <h6 id="moreInfo"></h6>
        </div>
    </div>
</div>
</div>
</div>
<?php
get_footer('studio');
?>
