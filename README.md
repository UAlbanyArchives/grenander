# grenander
Header and footer menus for UAlbany rails apps 


## Adding Grenander Themeing to Blacklight app

1. Add grenander to Gemfile and `bundle install`

```
# shared header, footer, etc.
gem 'grenander', git: 'https://github.com/UAlbanyArchives/grenander'
```

2. Add config to `app/contollers/catalog_controller.rb` to set to full width:

```
## Set to full-width layout with container-fluid
config.full_width_layout = true
```

3. Configure layout overrides.

**Sprockets apps** must still copy `app/views/layouts/blacklight/base.html.erb` into the host app (the engine-provided version is not used by Sprockets apps). Apply the Grenander partials and the constraints placement fix manually:

```
wget -O app/views/layouts/blacklight/base.html.erb https://raw.githubusercontent.com/projectblacklight/blacklight/main/app/views/layouts/blacklight/base.html.erb
```

Then edit the file:
- Replace `<%= render blacklight_config.header_component.new(blacklight_config: blacklight_config) %>` with the Grenander navbar and search row partials
- Remove the top-level `<%= content_for(:container_header) %>` from inside `<main>`
- Also copy and edit `app/views/layouts/blacklight.html.erb` to yield `<%= content_for(:container_header) %>` at the top of `section#content` (both sidebar and no-sidebar branches)

**Non-Sprockets apps** should not copy either layout file. Grenander owns the shared overrides in the engine:

```
app/views/layouts/blacklight.html.erb
app/views/layouts/blacklight/base.html.erb
```

If a non-Sprockets app already has local copies, remove them so the engine versions take effect:

```
rm app/views/layouts/blacklight/base.html.erb
rm app/views/layouts/blacklight.html.erb
```

4. Require CSS in `app/assets/stylesheets/application.css`

```
 *= require  'grenander/navbar'
 *= require  'grenander/search-source'
 *= require  'grenander/footer'
 *= require  'grenander/main'
 *
 *= require  'show_component'
 *= require  'context_navigation'
 *= require  'daos'
 *= require  'repositories'
```

5. Require JS in `app/assets/javascripts/application.js`

For Sprockets apps, use a require directive, not an ES module import:

```
//= require grenander/search_sources_menu
```

Do not put:

```
import "grenander/search_sources_menu"
```

inside `app/assets/javascripts/application.js`, because that file is evaluated by the asset pipeline as a classic script, not as a JavaScript module.

6. Now needs a `render_search_bar` helper, such as:

```
# search bar is custom to arclight so we need a helper
  def render_search_bar(params: {}, q: nil, search_field: nil)
    params ||= {}
    render(Arclight::SearchBarComponent.new(
      url: search_catalog_path,
      params: params.merge(f: (params[:f] || {}).except(:collection)),
      q: q,
      search_field: search_field,
      autocomplete_path: suggest_index_catalog_path
    ))
  end
```


7. Copy over 404.html, 422.html, 500.html to `public`

```
wget -O public/404.html https://raw.githubusercontent.com/UAlbanyArchives/grenander/master/public/404.html
wget -O public/422.html https://raw.githubusercontent.com/UAlbanyArchives/grenander/master/public/422.html
wget -O public/500.html https://raw.githubusercontent.com/UAlbanyArchives/grenander/master/public/500.html
```