using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;

namespace Sistema_comercial.Models.DTOs
{
    public class UsuarioDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public string Email { get; set; } = null!;

        public DateTime FechaRegistro { get; set; } = DateTime.Now;


    }
}
