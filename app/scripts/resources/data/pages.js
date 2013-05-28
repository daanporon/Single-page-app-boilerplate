(function (root, factory) {
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = factory();
        }
        exports.categories = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    }
}(this, function () {
    return [
        {
            'slug': 'page1',
            'title': 'Example page 1',
            'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis laoreet augue. Sed condimentum tempor felis, eu venenatis augue lacinia quis. Mauris mattis, diam at tristique venenatis, quam lectus imperdiet ligula, in tincidunt lorem augue a magna. Vivamus sit amet tellus quis magna bibendum venenatis a eu lorem. Cras urna leo, rhoncus ut imperdiet in, commodo non diam. In rutrum eros id nulla commodo euismod. Curabitur arcu lorem, tincidunt eget ultricies et, rutrum id mauris. Donec ipsum ipsum, porttitor vel dictum in, bibendum sed diam. Sed in enim vel nisi facilisis tempor. Integer quis elit massa, et rutrum urna. Nam viverra, nisl nec egestas convallis, sapien velit adipiscing ante, a viverra ante augue vel tortor. Quisque congue posuere est eget pellentesque.',
            'tags': ['lorem', 'ipsum']
        },
        {
            'slug': 'page2',
            'title': 'Example page 2',
            'content': 'Suspendisse sit amet lorem augue. Mauris ut ipsum diam. Aliquam in luctus augue. Donec sollicitudin tincidunt libero, congue pretium metus congue tempor. Duis rhoncus purus at tortor gravida in euismod ligula molestie. Vestibulum dictum quam ut urna mattis posuere. Ut diam lectus, pharetra vitae condimentum et, tincidunt sit amet lorem. Etiam magna diam, tristique ultricies sagittis sit amet, aliquet at leo. Integer pellentesque commodo eros, et pellentesque leo faucibus eu.',
            'tags': ['amet', 'ipsum']
        }
    ];
}));