
export function createNavBar() {
    let content = ` <h1>Tea</h1>
                    <nav class="nav__container" >
                        <ul class="nav" >
                            <li><a href="#">首頁</a></li>
                            <li><a href="#about">關於我們</a></li>
                            <li><a href="#tea">茶</a></li>
                            <li><a href="#">我的帳號</a></li>
                            <div class="cart__container"><a class="cart" href="./shoppingCart/shoppingCart.html"></a><div class="cart__quantity">0</div></div>
                        </ul>
                    </nav>
    `;
    return content;
}