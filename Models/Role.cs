using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Sistema_comercial.Models;

public partial class Role
{
    [BindNever]
    public int Id { get; set; }
    [Required(ErrorMessage = "El nombre del rol es obligatorio")]
    public string Nombre { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<Usuario> UsuarioCreadoPorNavigation { get; set; } = new List<Usuario>();
}
