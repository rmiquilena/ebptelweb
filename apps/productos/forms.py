from django import forms
from django.forms import widgets
from django.core.exceptions import ValidationError
from .models import Presentacion, Productos, Categorias, Unidades, Ubicacion, Ivaop, Utilidad

def get_iva():
    last_names = ()
    observers = Ivaop.objects.filter(is_active=True).order_by('valor')
    for obs in observers:
        last_names += (obs.id, obs.nombre),
    return last_names

def get_util():
    last_names = ()
    observers = Utilidad.objects.filter(is_active=True).order_by('valor')
    for obs in observers:
        last_names += (obs.valor, obs.valor),
    return last_names


class ProductosForm(forms.ModelForm):

    barcod = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control form-control-sm', 'autocomplete':'off'}), required=True )
    nombre = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control form-control-sm text-uppercase', 'autocomplete':'off'}), required=True)
    descri = forms.CharField(widget=forms.Textarea(attrs={'class': 'form-control  form-control-sm text-uppercase', 'rows':3}), required=False)
    catego = forms.ModelChoiceField(queryset=Categorias.objects.filter(is_active=True).order_by('nombre'), widget=forms.Select(attrs={'class': 'form-select form-control-sm ', 'placeholder':'Categorías'}), required=True)
    unidad = forms.ModelChoiceField(queryset=Unidades.objects.filter(is_active=True).order_by('nombre'), widget=forms.Select(attrs={'class': 'form-select form-control-sm'}), required=True)
    presen = forms.ModelChoiceField(queryset=Presentacion.objects.filter(is_active=True).order_by('nombre'), widget=forms.Select(attrs={'class': 'form-select form-control-sm'}),required=True)
    ubicas = forms.ModelChoiceField(queryset=Ubicacion.objects.filter(is_active=True).order_by('nombre'), widget=forms.Select(attrs={'class': 'form-select form-control-sm'}), required=True)
    stocka = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control form-control-sm', 'placeholder':'0','autocomplete':'off', 'onkeyup':'valinput(this,1)', 'onblur':'existencia(this.value)'}), required=True)
    stockm = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control form-control-sm', 'placeholder':'0','autocomplete':'off', 'onkeyup':'valinput(this,1)'}), required=True)
    existe = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control form-control-sm', 'readonly':'readonly', 'placeholder':'0','autocomplete':'off', 'onkeyup':'valinput(this,1), format(this)'}), required=True)
    pricec = forms.DecimalField(widget=forms.TextInput(attrs={'class': 'form-control form-control-sm', 'placeholder':'0.00', 'autocomplete':'off','onkeyup':'valinput(this,1)' }),required=True)
    utilid = forms.ChoiceField(choices=get_util, widget=forms.Select(attrs={'class': 'form-select form-control-sm', 'onblur':'calPreciovent()'}),required=True)
    monuti = forms.CharField(widget=forms.HiddenInput())
    ivaop  = forms.ChoiceField(choices=get_iva, widget=forms.Select(attrs={'class': 'form-select form-control-sm'}),required=True)
    pricev = forms.DecimalField(widget=forms.TextInput(attrs={'class': 'form-control form-control-sm', 'readonly':'readonly','placeholder':'0.00','autocomplete':'off'}), required=True )
    images = forms.CharField(widget=forms.HiddenInput())

    class Meta:
        model = Productos
        fields = ['barcod', 'nombre', 'descri', 'catego', 'unidad', 'presen', 'ubicas', 'stocka', 'stockm', 'existe', 'pricec','utilid', 'monuti', 'ivaop', 'pricev', 'images']