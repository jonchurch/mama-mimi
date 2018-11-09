var vid = "dQw4w9WgXcQ",
  audio_streams = {};

$.get('https://cors-anywhere.herokuapp.com/https://www.youtube.com/get_video_info?video_id=' + vid, function(data) {
  var data = parse_str(data),
    streams = (data.url_encoded_fmt_stream_map + ',' + data.adaptive_fmts).split(',');
  console.log(streams);
  $.each(streams, function(n, s) {
    var stream = parse_str(s),
      itag = stream.itag * 1,
      quality = false;
    console.log(stream);
    switch (itag) {
      case 139:
        quality = "48kbps";
        break;
      case 140:
        quality = "128kbps";
        break;
      case 141:
        quality = "256kbps";
        break;
    }
    if (quality) audio_streams[quality] = stream.url;
  });
  console.log(audio_streams);
  $("#youtube").attr({
    src: audio_streams['128kbps']
  });
});

function parse_str(str) {
  return str.split('&').reduce(function(params, param) {
    var paramSplit = param.split('=').map(function(value) {
      return decodeURIComponent(value.replace('+', ' '));
    });
    params[paramSplit[0]] = paramSplit[1];
    return params;
  }, {});
}