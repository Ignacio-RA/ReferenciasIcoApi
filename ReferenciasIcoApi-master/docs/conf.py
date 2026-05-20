import os
import sys
sys.path.insert(0, os.path.abspath('..'))

project = 'ReferenciasIcoApi'
copyright = ''
author = 'Ignacio'

# The short X.Y version
version = '1.0'
# The full version, including alpha/beta/rc tags
release = '1.0.0'

extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.napoleon',
]

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

html_theme = 'alabaster'
html_static_path = ['_static']
