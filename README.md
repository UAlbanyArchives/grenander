# grenander
Header and footer menus for UAlbany rails apps 


## Adding Grenander Themeing to Blacklight app

1. Add grenander to Gemfile and `bundle install`

```
# shared header, footer, etc.
gem 'grenander', git: 'https://github.com/UAlbanyArchives/grenander'
```

2. Add templates to `app/views/layouts/blacklight/base.html.erb`

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
    
    Remove/Comment --> <%= render partial: 'shared/header_navbar' %>
    Here --> <%= render partial: 'layouts/grenander/header_navbar' %>
    Here --> <%= render partial: 'layouts/grenander/search_subnav' %>

  <main id="main-container" class="<%= container_classes %>" role="main" aria-label="<%= t('blacklight.main.aria.main_container') %>">
    <%= content_for(:container_header) %>

    <%= render partial: 'shared/flash_msg', layout: 'shared/flash_messages' %>

    <div class="row">
      <%= content_for?(:content) ? yield(:content) : yield %>
    </div>
  </main>

  	Remove/Comment -- > <%= render partial: 'shared/footer' %>
    Here --> <%= render partial: 'layouts/grenander/footer' %>
    Here --> <%= render partial: 'shared/modal' %>
  </body>
```

3. Require JS in `app/assets/javascripts/application.js`

```
//= require 'grenander/headerAffix'
//= require 'grenander/searchHandler'
```

4. Require CSS in `app/assets/stylesheets/application.css`

```
 *= require  'grenander/headerNavbar'
 *= require  'grenander/browseNav'
 *= require  'grenander/searchSubnav'
```

5. Copy over 404.html, 422.html, 500.html to `public`

```
wget -O public/404.html https://raw.githubusercontent.com/UAlbanyArchives/grenander/master/public/404.html
wget -O public/422.html https://raw.githubusercontent.com/UAlbanyArchives/grenander/master/public/422.html
wget -O public/500.html https://raw.githubusercontent.com/UAlbanyArchives/grenander/master/public/500.html
```