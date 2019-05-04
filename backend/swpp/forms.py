from django import forms
from registration.forms import RegistrationFormUniqueEmail

class SNURegistrationForm(RegistrationFormUniqueEmail):
    def clean_email(self):
        super().clean_email()
        domain = self.cleaned_data['email'].split('@')[1]

        if not domain.endswith('snu.ac.kr'):
            raise forms.ValidationError('Not SNU email!')

        return self.cleaned_data['email']
