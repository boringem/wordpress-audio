<?php
/**
 * Functions for the studio work playlist plugin.
 * 
 * @package studio-work
 * @since 1.0.0
 */

 // exits if accessed directly
 if( !defined( 'ABSPATH' ) ) exit;

 /**
  * Function that retrieves all audio posts tagged as studio work into an array
  * 
  * @return array
  */
  
  function studio_get_posts() {
      $studio_work_album = array();
      $args = array(
          'post_type'       =>  'attachment',
          'post_mime_type'  =>  'audio',
          'numberposts'     =>  -1
      );
      $audiofiles = get_posts( $args );
      require_once( ABSPATH . 'wp-admin/includes/media.php' );
      $file_num = 0;
      $file_meta_info = wp_get_attachment_metadata( $file->ID );

      foreach( $audiofiles as $file ) {
          $url = wp_get_attachment_url( $file->ID );

          if( $file_meta_info['album'] == 'Studio Work' ) {
              $track_url = $url;
              $track_title = $file->post_title;
              $track_album = $file_meta_info['album'];
              $track_artist = $file_meta_info['artist'];
              $studio_work_album[$file_num]['url'] = $track_url;
              $studio_work_album[$file_num]['title'] = $track_title;
              $studio_work_album[$file_num]['album'] = $track_album;
              $studio_work_album[$file_num]['artist'] = $track_artist;
              $file_num++;
          } else {

          }
      }
      return $studio_work_album;
  }

?>