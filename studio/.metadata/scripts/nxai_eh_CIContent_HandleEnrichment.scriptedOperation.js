// Convert Content Intelligence enrichment labels/entities into individual Nuxeo
// tags. Handles providers for images and documents.
//
// Note that, because of our configuration to use image-metadata-generation
// instead of named-entity-recognition-image (OOTB), image labels come back as a
// comma separated string.
function run(input, params) {

  var enrichmentName = ctx.Event.getContext().getProperties().comment;

  if (enrichmentName === 'ai.contentintelligence' || enrichmentName === 'ai.contentintelligence.documents') {

    var target;
    toJsArray(input['enrichment:items']).forEach(function (item) {
      if (item.model === enrichmentName) {
        target = item;
      }
    });

    if (target && target.suggestions) {

      var seen = {};
      var tags = [];

      toJsArray(target.suggestions).forEach(function (suggestion) {
        toJsArray(suggestion.labels).forEach(function (labelEntry) {
          if (labelEntry.label) {
            labelEntry.label.split(',').forEach(function (piece) {
              var tag = piece.trim().replace(/\s+/g, '-');
              var key = tag.toLowerCase();
              if (tag.length > 0 && !seen[key]) {
                seen[key] = true;
                tags.push(tag);
              }
            });
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
var logPrefix = "nxai_eh_CIContent_HandleEnrichment: ";
// Turn log messages on or off globally.
var loggingEnabled = true;

function logHelper(message) {
  if (loggingEnabled)
    Console.warn(logPrefix + message);
}
