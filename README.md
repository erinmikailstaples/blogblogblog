# blogblogblog

A fun throwback [ghost.org](https://ghost.org)template that revives that frutiger aero style we either loved, hated, or loved to hate in those early 2000s.  For those missing the times they'd spend far too much time on that family computer, probably locking their sims in a pool, crashing the computer using limewire, or customizing your myspace template to be **just right**, this one is for you.💖

## Features

- **Clean Design**: Minimalist layout focusing on readability
- **Author Sidebar**: Dedicated sidebar displaying author profile, image, and bio
- **Responsive**: Adapts to different screen sizes
- **Wiki-like**: Simple, content-focused design perfect for knowledge sharing
- **Ghost 5.x Compatible**: Built for the latest Ghost version

## Theme Structure

```markdown
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

- **Frontend**: [http://localhost:2368](http://localhost:2368)
- **Admin**: [http://localhost:2368/ghost](http://localhost:2368/ghost)

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

   - Go to Ghost Admin [http://localhost:2368/ghost](https://localhost:2368/ghost)
   - Navigate to **Settings** → **Design**
   - Click **Change theme**
   - Select **blogblogblog** from the list
   - Click **Activate**

## Development

### Making Theme Edits

All theme files are located in `/content/themes/blogblogblog/` within your Ghost installation.

#### Key Files to Customize

- **`default.hbs`**: Main layout template
- **`partials/sidebar.hbs`**: Author sidebar content
- **`assets/css/screen.css`**: Theme styles
- **`index.hbs`**: Homepage layout
- **`post.hbs`**: Individual post layout
- **`tools.hbs`**: Layout Page for a "tools I use" page

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

## License

MIT License - see LICENSE file for details.

## Support

- [Ghost Theme Documentation](https://ghost.org/docs/themes/)
- [Ghost Community Forum](https://forum.ghost.org/)
- [Theme Issues](https://github.com/erinmikailstaples/blogblogblog/issues)

## Author

**[Erin Mikail Staples](https://erinmikilstaples.com)**

Built with ❤️ for the Ghost community.
