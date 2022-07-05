# DatoCMS-plugin: Extended SEO v2

**This plugin extends the DatoCMS SEO meta field. This plugin allows users to see a preview of different sources generated from [Heads Up](https://github.com/voorhoede/heads-up).**

## About this repo :scroll:
This project was build using:
- React.js
- Javascript
- HTML/CSS

## Table of contents
- [About the plugin](#what-does-this-plugin-do)
- [Installation & development](#installation-on-datocms)
- [Adding plugin to DatoCMS for development](#adding-plugin-to-datocms-for-development)
- [About DatoCMS](#about-datocms-cloud)
- [Contributing](#contributing)
- [License](#license)

## What does this plugin do?

* Enables user to see extended SEO card previews
* Use data from the model you are working on
* Edit SEO fields and save it directly as SEO data.
* Using the Voorhoede Heads Up

![extended seo plugin](https://github.com/voorhoede/datocms-plugin-extended-seo-v2/blob/main/docs/extended-seo-plugin.png)


#### Editor can edit fields
To edit the SEO-settings, the user can click on the configure button to open a modal with all the editable SEO-fields.

![edit fields](https://github.com/voorhoede/datocms-plugin-extended-seo-v2/blob/main/docs/extended-seo-edit-title.png)


#### Upload an image
The user can also upload an image that will be shown in the cards.

![upload image section](https://github.com/voorhoede/datocms-plugin-extended-seo-v2/blob/main/docs/extended-seo-add-image.png)


#### Remove/reset settings
The user can click on the reset button to remove all data from the editable SEO-settings. The user can also remove an uploaded image by opening the SEO-settings modal and hover over the image uploader. A button will appear, and once pressed, the uploaded image will be removed.

![remove or replace button](https://github.com/voorhoede/datocms-plugin-extended-seo-v2/blob/main/docs/extended-seo-remove-or-replace.png)



## Installation on DatoCMS
First add this plugin via DatoCMS Settings > Plugins > Add ```(/admin/plugins/new)```.
Secondly add an API token to the global settings of the plugin.


## Installation for development

### Cloning
Make sure you have Node installed on your machine if you want to install this plugin for development. Start a new project in your code-editor and run the following command:


```bash
    git clone https://github.com/voorhoede/datocms-plugin-extended-seo

```

### Node Modules 📦
The following step is to install the node modules/packages. Install the packages by running the following command in your terminal:

```bash
npm install
```

### Starting the application :collision:
Now that all the node modules are installed, you can start the application by entering the following command in your terminal:

```bash
npm start
```

## Adding plugin to DatoCMS for development
To add the plugin to your DatoCMS project, start by navigating to your DatoCMS project settings, go to plugins and add a new plugin.
Fill in the name of the plugin and the needed information. As entry point URL either fill in:

Please make sure to run your project locally so the project instantly changes while you save. If you are running your project locally fill in the following:

```bash
http://localhost:3000
```

If you already deployed the plugin, fill in your netlify (or your deployed site link) link in the entry point URL.

Make sure you enter the correct Field ID in the plugin model. You can do this by navigating to your models settings, edit the model settings and fill in your correct Field ID.
Also don't forget to fill in the name of your plugin in the field editor under the heading "Presentation":

![correct field id settings](https://github.com/voorhoede/datocms-plugin-extended-seo-v2/blob/main/docs/extended-seo-edit-field.png)

## About DatoCMS :cloud:
DatoCMS is a cloudbased headless CMS. See [datocms.md](https://github.com/voorhoede/datocms-plugin-extended-seo-v2/blob/main/datocms.md).

## Contributing

See [contributing.md](https://github.com/voorhoede/datocms-plugin-extended-seo-v2/blob/main/contributing.md).

## License

*MIT Licensed* by [De Voorhoede](https://www.voorhoede.nl).
