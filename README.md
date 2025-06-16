
# 🪟 BlogBlogBlog

A retro-fabulous [ghost.org](https://ghost.org) theme that brings back the Windows XP/Y2K aesthetic we all secretly miss! Remember that satisfying *click* of the Start button? The iconic Bliss wallpaper? The excitement of MSN Messenger pings? This theme packages all that nostalgic dopamine into a modern Ghost template. For those who spent hours customizing WinAmp skins, creating the perfect MySpace layout, or waiting forever for Limewire downloads - this one boots up just for you! 💾💙

## ✨ Features

- **Windows XP UI**: Complete with Start menu, classic window styling, and that sweet, sweet Frutiger Aero vibe
- **Y2K Aesthetics**: Embracing the maximalist design of the early 2000s internet
- **Start Menu Navigation**: Functional start menu with customizable quick links
- **Pagination Support**: Browse through your posts with next/previous navigation
- **Robust Error Handling**: Graceful fallbacks for all partials and templates
- **Accessibility Focused**: ARIA labels, semantic HTML, and keyboard navigation
- **Social Media Integration**: Built-in icons with customizable URLs and fallbacks
- **Responsive Design**: Looks great from 800x600 to modern 4K displays
- **Ghost 5.x Compatible**: Built for the latest Ghost version with full API support

## 💽 Theme Structure

```markdown
blogblogblog/
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── partials/
│   ├── fun-xp-header.hbs   # Windows XP styled header with navigation
│   ├── main-nav-cards.hbs  # Main navigation cards
│   ├── start-menu.hbs      # Classic Windows start menu
│   └── other partials...
├── default.hbs             # Main layout template
├── index.hbs               # Homepage with pagination
├── post.hbs                # Individual post template
├── page-about.hbs          # About page template
├── page-github.hbs         # GitHub profile page
├── page-tools.hbs          # Tools showcase page
└── package.json            # Theme metadata and configuration
=======
# blogblogblog

A simple, scalable, wiki-like Ghost theme with a sidebar for author info.

## Features

- **Clean Design**: Minimalist layout focusing on readability
- **Author Sidebar**: Dedicated sidebar displaying author profile, image, and bio
- **Responsive**: Adapts to different screen sizes
- **Wiki-like**: Simple, content-focused design perfect for knowledge sharing
- **Ghost 5.x Compatible**: Built for the latest Ghost version

## Theme Structure

```
template/
├── assets/
│   └── css/
├── partials/
│   └── sidebar.hbs      # Author information sidebar
├── default.hbs          # Main layout template
├── index.hbs           # Homepage template
├── post.hbs            # Individual post template
└── package.json        # Theme metadata
```

## Installation

### Prerequisites

Before installing this theme, you'll need a local Ghost installation. If you don't have Ghost installed locally, follow these steps:

#### 1. Install Node.js and Ghost CLI

Ensure you have [Node.js](https://nodejs.org) installed, then install Ghost CLI globally:

```bash
npm install ghost-cli@latest -g
```

#### 2. Install Ghost Locally

Create an empty directory for your Ghost installation and run:

```bash
mkdir my-ghost-blog
cd my-ghost-blog
ghost install local
```

Once installation is complete, your Ghost site will be available at:
- **Frontend**: http://localhost:2368
- **Admin**: http://localhost:2368/ghost

### Installing the blogblogblog Theme

1. **Download the theme**:
   ```bash
   git clone https://github.com/erinmikailstaples/blogblogblog.git
   ```

2. **Copy theme to Ghost**:
   Copy the `template` folder to your Ghost installation's themes directory:
   ```bash
   cp -r blogblogblog/template /path/to/your/ghost/content/themes/blogblogblog
   ```

3. **Activate the theme**:
   - Go to Ghost Admin (http://localhost:2368/ghost)
   - Navigate to **Settings** → **Design**
   - Click **Change theme**
   - Select **blogblogblog** from the list
   - Click **Activate**

## Development

### Making Theme Edits

All theme files are located in `/content/themes/blogblogblog/` within your Ghost installation.

#### Key Files to Customize

- **`default.hbs`**: Main layout template with Windows XP styling
- **`partials/fun-xp-header.hbs`**: Windows XP styled header with Start button
- **`partials/start-menu.hbs`**: Classic Start menu implementation
- **`assets/css/screen.css`**: Theme styles with Y2K aesthetics
- **`index.hbs`**: Homepage layout with pagination
- **`post.hbs`**: Individual post layout
- **`page-*.hbs`**: Various page templates (about, github, tools, etc.)

#### Error Handling Features

The theme now includes robust error handling for all partials:

```handlebars
{{!-- Example of error handling for partials --}}
{{#get "posts" limit="1" as |has_content|}}
  {{#if has_content}}
    {{> "partial-name"}}
  {{else}}
    <!-- Fallback content -->
  {{/if}}
{{/get}}
```

#### Live Reloading

Ghost automatically reloads theme changes. However, if you add **new files**, restart Ghost:

```bash
ghost restart
```

### Ghost Management Commands

```bash
# Start Ghost
ghost start

# Stop Ghost
ghost stop

# Restart Ghost (useful after adding new theme files)
ghost restart

# View logs
ghost log

# List all Ghost instances
ghost ls
```

### Theme Validation

Validate your theme for Ghost compatibility using GScan:

```bash
# Install GScan globally
npm install gscan -g

# Validate your theme
gscan /path/to/ghost/content/themes/blogblogblog
```

Or use the online validator at [gscan.ghost.org](https://gscan.ghost.org/).

## 🔧 Customization

### Windows XP Navigation

Edit `partials/fun-xp-header.hbs` to customize:

- Navigation menu items
- Social media links (with automatic fallbacks)
- Header content and branding

### Start Menu Configuration

Modify `partials/start-menu.hbs` to customize your Windows-style start menu:

```handlebars
<div id="start-menu" class="start-menu">
  <div class="start-menu-header">
    <span>{{@site.title}}</span>
  </div>
  <div class="start-menu-body">
    <!-- Customize your start menu links here -->
  </div>
</div>
```

### Styling Your Y2K Experience

The theme uses CSS variables for easy customization. Modify `assets/css/screen.css` to adjust:

- Windows XP color scheme (blues, greens, and that iconic taskbar gray)
- Window borders and button styles
- Animations and hover effects
- Responsive breakpoints for different "monitor sizes"

### Adding New Templates

Create new Handlebars templates following Ghost's [theme structure](https://ghost.org/docs/themes/) conventions. Remember to include error handling for all partials!
=======
## Customization

### Modifying the Sidebar

Edit `partials/sidebar.hbs` to customize the author information display or add additional sidebar content like navigation links, social media icons, or custom widgets.

### Styling

The theme uses a clean CSS structure. Modify `assets/css/screen.css` to customize:
- Colors and typography
- Layout and spacing
- Responsive breakpoints
- Sidebar styling

### Adding New Templates

Create new Handlebars templates following Ghost's [theme structure](https://ghost.org/docs/themes/structure/) conventions.


## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with GScan validation
5. Submit a pull request

## 📃 License

MIT License - see LICENSE file for details.

## 🖥️ Recent Updates

- **Error Handling**: All partials now have robust error handling with fallbacks
- **Accessibility**: Improved ARIA labels and semantic HTML
- **Pagination**: Added post pagination with previous/next links
- **Start Menu**: Enhanced Windows XP-style start menu functionality
- **Social Media**: Added social media integration with fallback URLs

## 👩‍💻 Author

**[Erin Mikail Staples](https://erinmikailstaples.com)**

Built with ❤️ for the Ghost community and everyone who misses the simpler days of the early internet.

*You've got mail!* 📨