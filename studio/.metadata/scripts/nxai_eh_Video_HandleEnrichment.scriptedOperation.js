// Convert AWS labels to tags. For some reason the OOTB tagger doesn't do this
// but at least we have the labels saved with the enrichment data.
function run(input, params) {

  var enrichmentName = ctx.Event.getContext().getProperties().comment;

  if (enrichmentName === 'aws.videoLabels') {

    var target;
    toJsArray(input['enrichment:items']).forEach(function (item) {
      if (item.model === 'aws.videoLabels') {
        target = item;
      }
    });

    if (target && target.suggestions) {

      var seen = {};
      var tags = [];

      toJsArray(target.suggestions).forEach(function (suggestion) {
        toJsArray(suggestion.labels).forEach(function (labelEntry) {
          if (labelEntry.label) {
            var tag = labelEntry.label.trim().replace(/\s+/g, '-');
            var key = tag.toLowerCase();
            if (tag.length > 0 && !seen[key]) {
              seen[key] = true;
              tags.push(tag);
            }
          }
        });
      });

      if (tags.length > 0) {
        Services.TagDocument(input, {
          'tags': tags
        });
        logHelper('Applied ' + tags.length + ' tag(s) to ' + input.path);
      } else {
        logHelper('No labels found in enrichment for ' + input.path);
      }
    }
  }

  return input;
}

function toJsArray(javaArray) {
  var jsArray = [];
  if (javaArray) {
    for (var i = 0; i < javaArray.length; i++) {
      jsArray.push(javaArray[i]);
    }
  }
  return jsArray;
}

//==============================================================================

// Prefix for log messages to make it easier to understand the context.
var logPrefix = "nxai_eh_Video_HandleEnrichment: ";
// Turn log messages on or off globally.
var loggingEnabled = true;

function logHelper(message) {
  if (loggingEnabled)
    Console.warn(logPrefix + message);
}
