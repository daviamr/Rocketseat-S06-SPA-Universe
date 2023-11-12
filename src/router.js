const app = document.getElementById('app');
const anchors = document.querySelectorAll('.header-anchor');

export class Router {
    routes = {};

    add(route, page) {
        this.routes[route] = page;
    }

    route(e) {
        e = e || window.event;
        e.preventDefault();

        window.history.pushState({}, '', event.target.href);

        this.handler();
    }

    handler() {
        const { pathname } = window.location;

        const route = this.routes[pathname] || this.routes[404];

        fetch(route)
            .then(data => data.text())
            .then((html) => {
                app.innerHTML = html;

                switch (pathname) {
                    case '/':
                        this.handlerBgAndToggleWeight('home', 0);
                        this.resetAnchor([1, 2])
                        break;

                    case `/universe`:
                        this.handlerBgAndToggleWeight(`universe`, 1);
                        this.resetAnchor([0, 2])
                        break;

                    case '/exploration':
                        this.handlerBgAndToggleWeight('exploration', 2);
                        this.resetAnchor([0, 1])
                        break;

                    default:
                        break;
                }
            })
    }

    handlerBgAndToggleWeight(bg, anchorIndex) {
        app.style.background = `url(./assets/img/bg-${bg}.png)`;
        app.style.backgroundSize = `cover`;
        app.style.backgroundPosition = `bottom`;
        anchors[anchorIndex].classList.add('activated');
    }

    resetAnchor(i) {
        i.forEach(e => {
            anchors[e].classList.remove('activated');
        });
    }
}