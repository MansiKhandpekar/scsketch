"""Invisible widget that reports the notebook output width to the CSS.

The scSketch layout needs to react to the width of the notebook *output area*,
not the browser window. CSS ``@container`` queries would do that, but
``container-type`` applies layout containment, which makes the container the
containing block for ``position: fixed`` descendants. jupyter-scatter draws its
lasso/brush pointer as a fixed element placed at ``clientX/clientY``, so a
container query on an ancestor of the plot offsets that pointer from the real
cursor. Instead, this widget watches the ``.sc-root`` element with a
``ResizeObserver`` and sets a ``data-sc-width`` attribute on it, which the
stylesheet uses for its breakpoints.
"""

from pathlib import Path

from anywidget import AnyWidget

_STATIC = Path(__file__).parent.parent / "static" / "widgets"


class WidthWatcher(AnyWidget):
    _esm = _STATIC / "width_watcher.js"
