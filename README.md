# Pipe

This is the beginning of a minimal theme for the blogging platform [Ghost](http://tryghost.org).

Focused on typography and readability, **Pipe** enables the author to bring great content to the readers.

## Features
- Ghost 0.4 support
- Static pages
- Social sharing (Twitter, Facebook, Google+ and LinkedIn)
- Fonts embedded via Google Fonts (Roboto Slab, and Open Sans)
- HTML5 semantics
- Twitter Card
- Open Graph tags
- Google Universal Analytics tracking code

## Installing

### Using Git
1. Navigate to your Ghost theme directory `ghost/content/themes`
2. Clone the theme repository using the command below
```sh
$ git clone https://github.com/thomasclausen/pipe-ghost/ "pipe"
```
3. Restart Ghost
4. Log in to your dashboard and navigate to Settings > Theme and select **Pipe** and save
5. That's all, now its time to [configure](#configuring) your theme

### Manually
1. Download the files using the [GitHub .zip download](https://github.com/thomasclausen/pipe-ghost/archive/master.zip) option
2. Copy the contents of the .zip file into your Ghost theme directory `ghost/content/themes/pipe`
3. Restart Ghost
4. Log in to your dashboard and navigate to Settings > Theme and select **Pipe** and save
5. That's all, now its time to [configure](#configuring) your theme

## Configuring

All configurable files are located in `pipe/partials/custom`.

#### meta.hbs

This file contains all the meta tags for the social networks.

You will need to change **@twitterusername** to your real Twitter username.

#### navigation.hbs

This file contains the blog navigation in the header.

If you don't wan't to use the navigation simply delete the content of the file.<br />
If the navigation fits your needs perfectly simply create two pages, one with the URL **about** and the other with the URL **contact**.<br />
If you need extra links in the navigation, just copy one of the lines starting with `<li>` and change the link and text.

#### analytics.hbs

This file contains the script for Google Universal Analytics.
You will need to change **UA-XXXXXXX-X** to the correct ID and **yourdomain.com** to your websites URL.

_**Note:** If you haven't upgraded your tracking code to the latest (Universal Analytics) just replace the entire code with the code provided by Google Analytics._

## Copyright & License

Copyright (C) 2014 Pipe - Released under the MIT License.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
