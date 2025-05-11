document.addEventListener('DOMContentLoaded', function() {
    // List of meme image URLs (update as you add more memes)
    const memes = [
        '{{asset "images/memes/under_construction.gif"}}',
        '{{asset "images/memes/blog_is_awesome.gif"}}',
        '{{asset "images/memes/cats_internet.gif"}}'
        // Add more meme asset paths here
    ];
    const img = document.querySelector('.glitch-img');
    function pickRandomMeme(currentSrc) {
        let meme;
        do {
            meme = memes[Math.floor(Math.random() * memes.length)];
        } while (memes.length > 1 && meme === currentSrc);
        return meme;
    }
    function updateMeme() {
        if (img) {
            // Remove Ghost's asset base if present for comparison
            const currentSrc = img.src.split('/images/memes/').pop();
            const memePaths = memes.map(m => m.split('/images/memes/').pop());
            let idx = memePaths.indexOf(currentSrc);
            let nextMeme;
            do {
                nextMeme = memes[Math.floor(Math.random() * memes.length)];
            } while (memes.length > 1 && memes.indexOf(nextMeme) === idx);
            img.src = nextMeme;
        }
    }
    if (img) {
        // Set a random meme on load
        img.src = pickRandomMeme();
        // Change meme on click or keyboard enter/space
        img.addEventListener('click', updateMeme);
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                updateMeme();
            }
        });
    }
}); 