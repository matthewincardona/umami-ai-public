<script>
    import logo from "$lib/images/logo.svg";
</script>

<nav>
    <div class="nav__inner">
        <a href="/">
            <img class="nav__logo" src={logo} alt="">
        </a>
    </div>
</nav>

<style>
    nav {
        background-color: white;
        border-bottom: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 15px;
        height: 60px;
        margin-bottom: 80px;
    }

    .nav__inner {
        width: 100%;
        max-width: 1200px;
        padding: 0 3%;
    }

    .nav__logo {
        width: 100%;
        max-width: 120px;
    }
</style>