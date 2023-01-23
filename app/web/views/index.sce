<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">

<head>
    <title>Home</title>
    <%- include("../partials/head.ejs") %>
</head>

<body>
    <header class="sticky-sm-top">
        [[i= ../partials/navbar.sce ]]
    </header>
    <div class="px-4 py-5 my-5 text-center">
        <h1 class="display-5 fw-bold">Share</h1>
        <div class="col-lg-6 mx-auto">
            <p class="lead mb-4">A invite only website where you can share files.</p>
        </div>
    </div>
    <footer class="fixed-bottom">
        [[i= ../paritals/footer.sce ]]
    </footer>
</body>

</html>