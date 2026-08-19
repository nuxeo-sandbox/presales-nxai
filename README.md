# presales-nxai

This project adds automated AI enrichment for video, images, and documents to the Nuxeo Platform.

It combines two capabilities:

* **Hyland Content Intelligence** — automatic `dc:description` and tags for images and documents, leveraging the [Nuxeo AI Content Intelligence](https://connect.nuxeo.com/nuxeo/site/marketplace/package/nuxeo-ai-content-intelligence) plugin.
* **AWS AI** — automatic tags for video, leveraging the [Nuxeo AI AWS](https://connect.nuxeo.com/nuxeo/site/marketplace/package/nuxeo-ai-aws) plugin (Amazon Rekognition video label detection).

The goal of this project is to be plug-and-play, providing automated AI enrichment for supported content types with no configuration required.

This is a [Nuxeo Studio](https://doc.nuxeo.com/n/dqH) Project to be used as a [multi-layer](https://doc.nuxeo.com/n/LVQ) dependency. The code is being stored in GitHub using the [External Source Repository](https://doc.nuxeo.com/n/ZB4) feature.

# Dependencies

* [Nuxeo AI Content Intelligence](https://connect.nuxeo.com/nuxeo/site/marketplace/package/nuxeo-ai-content-intelligence)
* [Nuxeo AI AWS](https://connect.nuxeo.com/nuxeo/site/marketplace/package/nuxeo-ai-aws)

# Installation

* Follow the documentation for Nuxeo AI Content Intelligence installation: [https://doc.nuxeo.com/nxdoc/nuxeo-ai-release-notes/#installation](https://doc.nuxeo.com/nxdoc/nuxeo-ai-release-notes/#installation)
* Follow the Nuxeo AI AWS instructions in the [README](https://github.com/nuxeo/nuxeo-ai/tree/master1/addons/nuxeo-ai-aws-core#nuxeo-ai-aws-integration)
* Add `presales-nxai` as a dependency to your Nuxeo Studio project.

## Optional Configuration

There are optional configuration values you can add to `nuxeo.conf` to tweak the Content Intelligence instructions. These are NOT required.

| Param | Applies to | Default | Controls |
| --- | --- | --- | --- |
| `nxai.image.maxWordCount` | Images | `80` | Caps the length of the generated image description written to `dc:description`. |
| `nxai.image.prompt` | Images | `Describe only what is clearly and directly visible in the image, in two to four complete sentences. Never return a single word or a fragment, and do not write multiple paragraphs. Be concrete and literal about the objects, people, colors, and setting you can actually see. Do not guess or infer things you cannot confirm, such as the type of place, brand, location, purpose, or level of luxury; if something is ambiguous, describe it in neutral literal terms instead of assuming what it is.` | Steers the image description (`image-description` action) → `dc:description`. |
| `nxai.image.labelsHint` | Images | `A comprehensive comma-separated list of general Title Case labels for the visible content: objects, living things, people, scene, setting, activities, and concepts.` | Steers the labels (`image-metadata-generation`) that the automation turns into tags. |
| `nxai.documents.maxWordCount` | Documents | `60` | Caps the length of the generated document summary written to `dc:description`. |
| `nxai.documents.prompt` | Documents | `In two or three sentences, describe what this document is and its purpose, and give the single most important takeaway a reader would want before opening it. Summarize at the level of gist and intent, the kind of abstract that is not already obvious from a full-text search. Do not enumerate the individual tables, figures, values, or sections, and do not restate the content line by line. Base the summary only on what the document actually contains; do not invent facts.` | Steers the summary (`text-summarization` action) → `dc:description`. |

# Usage

Simply upload content to Nuxeo. For images and documents, both `dc:description` and tags will be automatically filled in for supported types. For video, tags will be automatically applied.

# Support

**These features are not part of the Nuxeo Production platform.**

These solutions are provided for inspiration and we encourage customers to use them as code samples and learning resources.

This is a moving project (no API maintenance, no deprecation process, etc.) If any of these solutions are found to be useful for the Nuxeo Platform in general, they will be integrated directly into platform, not maintained here.

# License

[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

# About Nuxeo

More information is available at [https://www.hyland.com/en/solutions/products/nuxeo-platform](https://www.hyland.com/en/solutions/products/nuxeo-platform).
