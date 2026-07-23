let postsData = [
    {
        id: 1,
        author: "Romelito Tonido",
        category: "Sports Cars",
        status: "Active",
        likes: 68,
        content: "Top high-performance sports cars built for speed and elegance.",
        images: [
            "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&h=350&fit=crop",
            "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=600&h=350&fit=crop",
            "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=600&h=350&fit=crop",
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=350&fit=crop",
            "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=350&fit=crop"
        ],
        comments: [
            { author: "Gearhead", text: "That engine roar is insane! 🏎️" },
            { author: "Speedster", text: "Dream garage line-up right here." }
        ]
    },
    {
        id: 2,
        author: "Ignacio Alicandogs",
        category: "Sport Motorcycles",
        status: "Active",
        likes: 45,
        content: "High-revving superbikes engineered for pure adrenaline on the track.",
        images: [
            "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&h=350&fit=crop",
            "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&h=350&fit=crop",
            "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=600&h=350&fit=crop",
            "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&h=350&fit=crop",
            "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=600&h=350&fit=crop"
        ],
        comments: [
            { author: "RiderX", text: "Nothing beats two wheels! 🏍️" },
            { author: "TrackFan", text: "That lean angle is incredible!" }
        ]
    },
    {
        id: 3,
        author: "Mark Justine Ong",
        category: "Bicycles & Cycling",
        status: "Active",
        likes: 89,
        content: "Exploring fixies, road bikes, and mountain bikes for every type of ride.",
        images: [
            "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=350&fit=crop",
            "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&h=350&fit=crop",
            "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=600&h=350&fit=crop",
            "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=600&h=350&fit=crop",
            "https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=600&h=350&fit=crop"
        ],
        comments: [
            { author: "UrbanCyclist", text: "Loving the clean fixed-gear setup! 🚲" },
            { author: "TrailBlazer", text: "Great trail shot for the MTB!" }
        ]
    }
];

document.addEventListener("DOMContentLoaded", () => {
    renderFeed(postsData);
    updateMetrics();
});

function switchView(targetView) {
    const views = {
        'home': document.getElementById('viewHome'),
        'about': document.getElementById('viewAbout'),
        'details': document.getElementById('viewDetails')
    };

    const navs = {
        'home': document.getElementById('navHome'),
        'about': document.getElementById('navAbout'),
        'details': document.getElementById('navDetails')
    };

    Object.keys(views).forEach(key => {
        if (key === targetView) {
            views[key].classList.remove('d-none');
            navs[key].classList.add('active');
        } else {
            views[key].classList.add('d-none');
            navs[key].classList.remove('active');
        }
    });

    hideAlert();
}

function renderFeed(dataList) {
    const feedContainer = document.getElementById('postsFeed');
    feedContainer.replaceChildren();

    if (dataList.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'text-center text-secondary py-4';
        emptyMsg.textContent = 'No posts found.';
        feedContainer.appendChild(emptyMsg);
        return;
    }

    dataList.forEach(post => {
        // Card Container
        const card = document.createElement('div');
        card.className = 'card main-card bg-body-tertiary border-secondary shadow-lg mb-4';

        // Card Header
        const cardHeader = document.createElement('div');
        cardHeader.className = 'card-header border-secondary d-flex justify-content-between align-items-center';

        const authorGroup = document.createElement('div');
        
        // Changed author name color to primary (Blue)
        const author = document.createElement('strong');
        author.className = 'text-primary'; 
        author.textContent = post.author;

        const category = document.createElement('span');
        category.className = 'badge bg-secondary ms-2';
        category.textContent = post.category;

        authorGroup.append(author, category);

        const postId = document.createElement('small');
        postId.className = 'text-secondary';
        postId.textContent = `Post #${post.id}`;

        cardHeader.append(authorGroup, postId);

        // Carousel
        const carousel = document.createElement('div');
        carousel.id = `carouselPost${post.id}`;
        carousel.className = 'carousel slide';
        carousel.setAttribute('data-bs-ride', 'false');

        const carouselInner = document.createElement('div');
        carouselInner.className = 'carousel-inner';

        post.images.forEach((imgUrl, index) => {
            const item = document.createElement('div');
            item.className = `carousel-item ${index === 0 ? 'active' : ''}`;

            const img = document.createElement('img');
            img.src = imgUrl;
            img.className = 'd-block w-100 carousel-img';
            img.alt = `Photo ${index + 1}`;

            item.appendChild(img);
            carouselInner.appendChild(item);
        });

        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-control-prev';
        prevBtn.type = 'button';
        prevBtn.setAttribute('data-bs-target', `#carouselPost${post.id}`);
        prevBtn.setAttribute('data-bs-slide', 'prev');

        const prevIcon = document.createElement('span');
        prevIcon.className = 'carousel-control-prev-icon';
        prevBtn.appendChild(prevIcon);

        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-control-next';
        nextBtn.type = 'button';
        nextBtn.setAttribute('data-bs-target', `#carouselPost${post.id}`);
        nextBtn.setAttribute('data-bs-slide', 'next');

        const nextIcon = document.createElement('span');
        nextIcon.className = 'carousel-control-next-icon';
        nextBtn.appendChild(nextIcon);

        carousel.append(carouselInner, prevBtn, nextBtn);

        // Card Body
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const content = document.createElement('p');
        content.className = 'card-text';
        content.textContent = post.content;

        // Likes section
        const likeRow = document.createElement('div');
        likeRow.className = 'd-flex align-items-center gap-2 mb-3';

        const likeBtn = document.createElement('button');
        likeBtn.className = 'btn btn-outline-primary btn-sm fw-bold';
        likeBtn.textContent = '👍 Like';
        likeBtn.onclick = () => spamLike(post.id);

        const likeText = document.createElement('span');
        likeText.className = 'fw-bold';

        const likeCount = document.createElement('span');
        likeCount.id = `likeCount-${post.id}`;
        likeCount.textContent = post.likes;

        likeText.append(likeCount, ' Likes');
        likeRow.append(likeBtn, likeText);

        const hr = document.createElement('hr');
        hr.className = 'border-secondary';

        // Comments Toggle
        const toggleWrapper = document.createElement('div');
        toggleWrapper.className = 'mb-2';

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'btn btn-link text-primary text-decoration-none p-0 small';
        toggleBtn.type = 'button';
        toggleBtn.setAttribute('data-bs-toggle', 'collapse');
        toggleBtn.setAttribute('data-bs-target', `#comments-${post.id}`);

        const commentCountSpan = document.createElement('span');
        commentCountSpan.id = `commentCount-${post.id}`;
        commentCountSpan.textContent = post.comments.length;

        toggleBtn.append('💬 Toggle Comments (', commentCountSpan, ')');
        toggleWrapper.appendChild(toggleBtn);

        // Comments Collapse Section
        const collapseDiv = document.createElement('div');
        collapseDiv.className = 'collapse';
        collapseDiv.id = `comments-${post.id}`;

        const commentList = document.createElement('div');
        commentList.className = 'bg-light p-3 rounded border border-secondary mb-3';
        commentList.id = `commentList-${post.id}`;

        // Render comments with author in blue
        post.comments.forEach(c => {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'border-bottom border-secondary py-1 small';

            const commentAuthor = document.createElement('strong');
            commentAuthor.className = 'text-primary me-2'; // Blue color
            commentAuthor.textContent = `${c.author}:`;

            const commentText = document.createElement('span');
            commentText.textContent = c.text;

            commentDiv.append(commentAuthor, commentText);
            commentList.appendChild(commentDiv);
        });

        // Comment Input Group
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group input-group-sm';

        const input = document.createElement('input');
        input.type = 'text';
        input.id = `commentInput-${post.id}`;
        input.className = 'form-control';
        input.placeholder = 'Write a comment...';

        const postCommentBtn = document.createElement('button');
        postCommentBtn.className = 'btn btn-primary fw-bold';
        postCommentBtn.textContent = 'Post';
        postCommentBtn.onclick = () => addComment(post.id);

        inputGroup.append(input, postCommentBtn);
        collapseDiv.append(commentList, inputGroup);

        // Assembly
        cardBody.append(content, likeRow, hr, toggleWrapper, collapseDiv);
        card.append(cardHeader, carousel, cardBody);
        feedContainer.appendChild(card);
    });
}

function spamLike(postId) {
    const post = postsData.find(p => p.id === postId);
    if (post) {
        post.likes += 1;
        document.getElementById(`likeCount-${postId}`).textContent = post.likes;
        updateMetrics();
    }
}

function addComment(postId) {
    const input = document.getElementById(`commentInput-${postId}`);
    const text = input.value.trim();

    if (!text) {
        showAlert("Please enter a comment before posting.");
        return;
    }

    const post = postsData.find(p => p.id === postId);
    if (post) {
        const newComment = { author: "You", text: text };
        post.comments.push(newComment);
        
        const commentList = document.getElementById(`commentList-${postId}`);
        const newCommentDiv = document.createElement('div');
        newCommentDiv.className = 'border-bottom border-secondary py-1 small';

        const commentAuthor = document.createElement('strong');
        commentAuthor.className = 'text-primary me-2'; // Blue color
        commentAuthor.textContent = `${newComment.author}:`;

        const commentText = document.createElement('span');
        commentText.textContent = newComment.text;

        newCommentDiv.append(commentAuthor, commentText);
        commentList.appendChild(newCommentDiv);

        document.getElementById(`commentCount-${postId}`).textContent = post.comments.length;

        input.value = '';
        hideAlert();
    }
}

function updateMetrics() {
    const totalPosts = postsData.length;
    const totalLikes = postsData.reduce((sum, post) => sum + post.likes, 0);

    document.getElementById('totalPostsBadge').textContent = totalPosts;
    document.getElementById('metricTotalPosts').textContent = totalPosts;
    document.getElementById('metricTotalLikes').textContent = totalLikes;
}

function showAlert(msg) {
    const alertBox = document.getElementById('validationAlert');
    alertBox.textContent = msg;
    alertBox.classList.remove('d-none');
}

function hideAlert() {
    const alertBox = document.getElementById('validationAlert');
    alertBox.classList.add('d-none');
}


