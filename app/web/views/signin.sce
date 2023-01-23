<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">

<head>
    <title>Home</title>
    <%- include("../partials/head.ejs") %>
</head>

<body class="text-center">
    <main class="form-signin w-100 m-auto">
        <form>
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

            <div class="form-floating">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
                    style="background-color: rgb(255, 255, 204); color: rgb(0, 0, 0);">
                <label for="floatingInput">Email address</label>
                <span class="spanner"></span>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
                <span class="spanner"></span>
            </div>

            <div class="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me" data-form-type="consent,rememberme"> Remember me
                </label>
            </div>
            <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            <p class="mt-5 mb-3 text-muted"><%- include('../partials/copyright.ejs')%></p>
        </form>
    </main>
</body>

</html>