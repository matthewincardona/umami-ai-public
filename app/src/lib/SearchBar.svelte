<script>
    import SearchIcon from "$lib/images/search-icon.svg";
</script>

<form class="search-bar">
    <input type="text" class="search-bar__input" id="searchBar" placeholder="Search is coming soon!">
    <button type="submit" class="search-bar__btn">
        <img class="search-bar__icon" src={SearchIcon} alt="">
    </button>
</form>

<style>
    .search-bar {
        position: relative;
        display: flex;
        justify-content: center;
    }

    .search-bar__input {
        border-radius: 5000px;
        border: solid 1px black;
        width: 90vw;
        max-width: 660px;
        padding: 0px 30px;
        height: 55px;
    }

    .search-bar__icon {
        width: 28px;
        height: 28px;
    }

    .search-bar__btn {
        position: absolute;
        bottom: 14px;
        right: 25px;
        border: none;
        background: none;
        cursor: pointer;
    }
</style>