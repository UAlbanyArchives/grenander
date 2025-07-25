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

3. Add templates to `app/views/layouts/blacklight/base.html.erb`

```
wget -O app/views/layouts/blacklight/base.html.erb https://github.com/projectblacklight/blacklight/blob/master/app/views/layouts/blacklight/base.html.erb
```


```
<body class="<%= render_body_class %>">
    <nav id="skip-link" role="navigation" aria-label="<%= t('blacklight.skip_links.label') %>">
      <%= link_to t('blacklight.skip_links.search_field'), '#search_field', class: 'element-invisible element-focusable rounded-bottom py-2 px-3', data: { turbolinks: 'false' } %>
      <%= link_to t('blacklight.skip_links.main_content'), '#main-container', class: 'element-invisible element-focusable rounded-bottom py-2 px-3', data: { turbolinks: 'false' } %>
      <%= content_for(:skip_links) %>
    </nav>
    
    Remove or Comment --> <%= render partial: 'shared/header_navbar' %>
    Here --> <%= render partial: 'layouts/grenander/navbar' %>
    Here --> <%= render partial: 'grenander/search_row' %>

  <main id="main-container" class="<%= container_classes %>" role="main" aria-label="<%= t('blacklight.main.aria.main_container') %>">
    <%= content_for(:container_header) %>

    <%= render partial: 'shared/flash_msg', layout: 'shared/flash_messages' %>

    <div class="row">
      <%= content_for?(:content) ? yield(:content) : yield %>
    </div>
  </main>

  	Remove or comment -- > <%= render partial: 'shared/footer' %>
    Here --> <%= render partial: 'layouts/grenander/footer' %> 
    <%= render partial: 'shared/modal' %>
  </body>
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

```
import "grenander/search_sources_menu"
```

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