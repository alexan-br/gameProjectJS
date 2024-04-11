document.addEventListener("DOMContentLoaded", function () {
    var numDots = 10; // Number of dots in the trail
    var dots = [];

    for (var i = 0; i < numDots; i++) {
        var dot = document.createElement('div');
        dot.className = 'dot';
        document.body.appendChild(dot);
        dots.push(dot);
    }

    document.addEventListener('mousemove', function (e) {
        var mouseX = e.pageX;
        var mouseY = e.pageY;

        for (var i = 0; i < numDots; i++) {
        setTimeout(function(index) {
            return function() {
            var dot = dots[index];
            var scaleFactor = 1 - index / numDots; // Adjust scale factor for dot size
            var opacity = 1 - index / numDots; // Adjust opacity for fading effect

            dot.style.transform = 'translate(' + (mouseX - 0.1 * index) + 'px, ' + (mouseY - 0.1 * index) + 'px) scale(' + scaleFactor + ')';
            dot.style.opacity = opacity;
            };
        }(i), i * 10); // Adjust delay (100 milliseconds in this example)
        }
    });
})