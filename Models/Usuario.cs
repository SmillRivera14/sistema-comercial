using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Sistema_comercial.Models;

public partial class Usuario
{
    [BindNever]
    public int Id { get; set; }
    [Required(ErrorMessage ="Se necesita el nombre de usuario")]
    public string Nombre { get; set; } = null!;
    [Required(ErrorMessage ="Debe introducir una contraseña")]
    public string PasswordHash { get; set; } = null!;
    [EmailAddress]
    [Required(ErrorMessage = "Debe introducir un email")]
    public string Email { get; set; } = null!;

    [Required(ErrorMessage = "Debe introducir un roll")]
    [JsonIgnore]
    public int RolId { get; set; } = 2;
    public DateTime FechaRegistro { get; set; }

    [JsonIgnore]
    public virtual Role? CreadoPorNavigation { get; set; } 

}
