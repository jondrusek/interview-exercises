# Backstage design

Although not necessarily built this way for this repo, I see the backstage project being built following these rules:

## Plugin design

Use existing and established plugins first where possible. We don't need to reinvent the wheel if something is already established

Plugins should provide all of the functionality in the system.

All plugins should be lightweight. It should follow similar tenets to linux command design where each command does one thing really well, and more complex functionality can be created by composing multiple commands. Following this example, complex interactions can be created by having a frontend plugin that uses multiple backend plugins to get difference pieces of data instead of having a more complex backend plugin that does a bunch of things,

The pros of this approach are that each plugin is easier to test. And with the nature of the plugins being isolated from one another, if an issue is found with one plugin, it doesn't bleed into others. And if an issue is found in a plugin, it can be built out on its own and tested/fixed. The cons are of course more plugins, but I think having plugins that are easier to understand at face value outweigh that drawback.

Any front end plugins should be focused on displaying content, and any data that needs to be fetched should go through a backend plugin. This would ensure that frontend plugins aren't just fetching data from random places as it would make following the plugins much more difficult. Also, having the front end plugins have to get data from backend plugins ensures that they are going through tested locations. The trade-off here being that there may be more backend plugins needed, but the positive is architectural consistency within the project.

## Catalog design

The more I've been thinking about the catalogs, the more I think it may be reasonable to have a single repo for managing catalog info. For example, instead of each repo having to have a catalog-info.yaml file in it, we could have a software-catalog.yaml that has all of our repo information in it. With this, it could be automatically curated more easily. We could also just have a simple static location in the app-config to handle the entirety of the repository catalog. This repo could also contain any other catalogs we may want to manage. The tradeoffs are that if someone wanted to change something about the catalog info for the specific repository they are working on, like setting a new group owner, this isn't quite as clear as it would be if the catalog info was on each repository individually. I could see this going either way, I guess it depends on how much we expect the developers to be curating the catalog info themselves versus having mechanisms to automatically manage them. We could also just create plugins for users to manage this stuff through backstage itself if we wanted.